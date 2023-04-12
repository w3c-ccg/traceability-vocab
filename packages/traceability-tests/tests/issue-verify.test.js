const jose = require('jose');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// pending merge of https://github.com/w3c-ccg/traceability-vocab/pull/735
// const { schemas } = require('traceability-schemas');
const schemas = [];
const privateKeyJwk = require('./privateKeyJwk');

const credentials = schemas
  .map((s) => {
    try {
      return JSON.parse(s.example);
    } catch (e) {
      console.error(e, s);
    }
    return null;
  })
  .filter((i) => !!i)
  .filter(
    (item) => item.type
      && (item.type === 'VerifiableCredential' || item.type.includes('VerifiableCredential'))
  )
  .map((vc) => {
    const { proof, ...credential } = vc;
    return credential;
  });

const updateExamplesToV2 = (example, { issuer }) => {
  const claimset = JSON.parse(JSON.stringify(example));
  claimset['@context'][0] = 'https://www.w3.org/ns/credentials/v2';
  claimset.id = `urn:uuid:${uuidv4()}`;
  if (claimset.issuer.id) {
    claimset.issuer.id = issuer;
  } else {
    claimset.issuer = issuer;
  }
  const [_, type] = claimset.type;
  claimset.credentialSchema = {
    id: `https://w3id.org/traceability/openapi/components/schemas/credentials/${type}.yml`,
    type: 'OpenApiSpecificationValidator2022',
  };
  return claimset;
};

describe('sign and verify', () => {
  let privateKey;
  const fixture = { privateKeyJwk, examples: [] };

  beforeAll(async () => {
    privateKey = await jose.importJWK(privateKeyJwk);
  });

  it('has schemas', () => {
    expect(schemas).toBeDefined();
  });

  credentials.forEach(async (credential) => {
    const [_, type] = credential.type;
    it(type, async () => {
      const { d, ...publicKeyJwk } = privateKeyJwk;
      const issuer = `did:jwk:${jose.base64url.encode(JSON.stringify(publicKeyJwk))}`;
      const claimset = updateExamplesToV2(credential, { issuer });
      const jwt = await new jose.CompactSign(Buffer.from(JSON.stringify(claimset)))
        .setProtectedHeader({
          iss: issuer,
          kid: '#0',
          alg: 'EdDSA',
          cty: 'vc+ld+json',
        })
        .sign(privateKey);
      const { payload, protectedHeader } = await jose.jwtVerify(jwt, privateKey);
      expect(protectedHeader.iss).toBe(issuer);
      expect(protectedHeader.cty).toBe('vc+ld+json');
      fixture.examples.push({ issued: jwt, verified: { protectedHeader, payload } });
    });
  });

  afterAll(() => {
    // pending merge of https://github.com/w3c-ccg/traceability-vocab/pull/735
    // fs.writeFileSync('./examples/v2.json', JSON.stringify(fixture, null, 2));
  });
});
