const fs = require('fs');
const path = require('path');
const cred = require('@transmute/credentials-context');
const did = require('@transmute/did-context');
const sec = require('@transmute/security-context');

const contexts = {
  'https://www.w3.org/2018/credentials/v1': cred.contexts.get(
    'https://www.w3.org/2018/credentials/v1'
  ),
  'https://www.w3.org/ns/did/v1': did.contexts.get(
    'https://www.w3.org/ns/did/v1'
  ),
  'https://w3id.org/security/suites/jws-2020/v1': sec.contexts.get(
    'https://w3id.org/security/suites/jws-2020/v1'
  ),
  'https://w3id.org/traceability/v1': JSON.parse(
    fs
      .readFileSync(
        path.resolve(
          __dirname,
          '../../../docs/contexts/traceability-v1.1.jsonld'
        )
      )
      .toString()
  ),
};

const dids = {
  'did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U': {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/jws-2020/v1',
    ],
    id: 'did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U',
    verificationMethod: [
      {
        id: 'did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U#z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U',
        type: 'JsonWebKey2020',
        controller: 'did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U',
        publicKeyJwk: {
          kty: 'OKP',
          crv: 'Ed25519',
          x: 'zX2zoGmW36TTL_kw3g-KFVjh5IoaDcoSc08jID4uGrs',
        },
      },
      {
        id: 'did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U#z6LSnwWmr9SEPihTosSC6huv6hN22NkFnrFZjxvgZBYppNEi',
        type: 'JsonWebKey2020',
        controller: 'did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U',
        publicKeyJwk: {
          kty: 'OKP',
          crv: 'X25519',
          x: 'p15wup5TtVlX-A1RWSJYcoaKyxGwMO1nLTk7whNfLDc',
        },
      },
    ],
    assertionMethod: [
      'did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U#z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U',
    ],
    authentication: [
      'did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U#z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U',
    ],
    capabilityInvocation: [
      'did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U#z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U',
    ],
    capabilityDelegation: [
      'did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U#z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U',
    ],
    keyAgreement: [
      'did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U#z6LSnwWmr9SEPihTosSC6huv6hN22NkFnrFZjxvgZBYppNEi',
    ],
  },
};

const documentLoader = (iri) => {
  if (contexts[iri]) {
    return { document: contexts[iri] };
  }

  const iriWithoutFragment = iri.split('#')[0];

  if (dids[iriWithoutFragment]) {
    return { document: dids[iriWithoutFragment] };
  }
  const message = `Unsupported iri: ${iri}`;
  console.error(message);
  throw new Error(message);
};

module.exports = documentLoader;
