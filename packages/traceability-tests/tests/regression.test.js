const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const { schemas } = require('traceability-schemas')
const { issuer, verifier } = require('../utils')

const upgradeClaimset = (example) => {
  const claimset = JSON.parse(JSON.stringify(example))
  // claimset['@context'][0] = 'https://www.w3.org/ns/credentials/v2';
  claimset.id = `urn:uuid:${uuidv4()}`
  if (claimset.issuer.id) {
    claimset.issuer.id = issuer.id
  } else {
    claimset.issuer = issuer.id
  }
  // TODO: https://github.com/w3c-ccg/traceability-vocab/issues/787
  // claimset.validFrom = claimset.validFrom;
  // delete claimset.validFrom;
  delete claimset.proof
  return claimset
}

describe('regression tests', () => {
  const fixture = { privateKeyJwk: issuer.privateKeyJwk, examples: [] }
  schemas.forEach(async (schema) => {
    // only apply the upgrade to tagged schemas
    if (schema.tags && schema.tags.includes('VCDMv2')) {
      it(schema.title, async () => {
        const claimset = upgradeClaimset(JSON.parse(schema.example), { issuer })
        // issuer validates against a schema before signing...
        const issuerValidation = await issuer
          .validator(claimset.credentialSchema.id)
          .validate(claimset)
        expect(issuerValidation).toBe(true)
        // credential issuance
        const vc = await issuer.signer.sign(claimset)
        // credential verification
        const { payload, protectedHeader } = await verifier.verify(vc)
        // verifier validates against a schema after verifying...
        const verifierValidation = await verifier
          .validator(claimset.credentialSchema.id)
          .validate(claimset)
        expect(verifierValidation).toBe(true)
        expect(protectedHeader.iss).toBe(issuer.id)
        expect(protectedHeader.cty).toBe('vc+ld+json')
        fixture.examples.push({
          issued: vc,
          verified: { protectedHeader, payload },
        })
      })
    }
  })

  afterAll(() => {
    // all these examples will be broken because of the unresolved issue here:
    // https://github.com/w3c-ccg/traceability-vocab/issues/786
    // except for the schemas that are tagged VCDMv2
    fs.writeFileSync('./examples/v2.json', JSON.stringify(fixture, null, 2))
  })
})
