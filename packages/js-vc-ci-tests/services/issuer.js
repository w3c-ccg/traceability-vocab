const { Ed25519KeyPair } = require('@transmute/did-key-ed25519');
const { Ed25519Signature2018 } = require('@transmute/ed25519-signature-2018');
const vcjs = require('@transmute/vc.js');
const { documentLoader } = require('./documentLoader');

const keyJson = require('../keys/did-key-ed25519.json');

const issue = async ({ credentialSubject }, context = [
  'https://www.w3.org/2018/credentials/v1',
]) => {
  const key = await Ed25519KeyPair.from(keyJson);
  const verifiableCredential = await vcjs.ld.issue({
    credential: {
      '@context': context,
      id: 'https://example.com/123',
      type: ['VerifiableCredential'],
      issuer: {
        id: key.controller,

      },
      issuanceDate: '2020-03-10T04:24:12.164Z',
      expirationDate: '2029-03-10T04:24:12.164Z',
      credentialSubject,
    },
    suite: new Ed25519Signature2018({
      key,
    }),
    documentLoader,
  });
  const result = await vcjs.ld.verifyCredential({
    credential: verifiableCredential,
    suite: new Ed25519Signature2018(),
    documentLoader,
  });
  return { verified: result.verified, verifiableCredential };
};

module.exports = { issue };
