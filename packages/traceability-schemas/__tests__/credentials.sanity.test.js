/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */

const transmute = require('@transmute/vc.js');
const { Ed25519Signature2018 } = require('@transmute/ed25519-signature-2018');
const documentLoader = require('../services/documentLoader');

const { schemas } = require('../services/schemas');

const verifiableCredentials = schemas
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
    (item) =>
      item.type &&
      (item.type === 'VerifiableCredential' ||
        item.type.includes('VerifiableCredential'))
  )
  .sort((a, b) => (a.type.toString() > b.type.toString() ? -1 : 1));

describe('Verifiable Credentials', () => {
  verifiableCredentials.forEach((vc) => {
    //   note the hacky search for a useful credential type here...
    const credentialType = Array.isArray(vc.type)
      ? vc.type[vc.type.length - 1]
      : vc.type;

    it(credentialType, async () => {
      const { verified } = await transmute.verifiable.credential.verify({
        credential: vc,
        format: ['vc'],
        documentLoader,
        suite: [new Ed25519Signature2018()],
        // Ignore revocation lists...
        checkStatus: () => ({ verified: true }),
      });
      expect(verified).toBe(true);
    });
  });
});
