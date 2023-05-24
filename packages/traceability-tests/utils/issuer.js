const jose = require('jose');
const privateKeyJwk = require('./privateKeyJwk');
const validator = require('./validator');

const { d, ...publicKeyJwk } = privateKeyJwk;

const id = `did:jwk:${jose.base64url.encode(JSON.stringify(publicKeyJwk))}`;

const signer = (privateKey) => ({
  sign: async (
    claimset,
    header = {
      iss: id,
      kid: '#0',
      alg: publicKeyJwk.alg,
      cty: 'vc+ld+json',
    }
  ) => {
    const jwt = await new jose.CompactSign(Buffer.from(JSON.stringify(claimset)))
      .setProtectedHeader(header)
      .sign(await jose.importJWK(privateKey));
    return jwt;
  },
});

const api = {
  id,
  alg: publicKeyJwk.alg,
  signer: signer(privateKeyJwk),
  // exported here for test vectors, normally not exposed.
  privateKeyJwk,
  // normally this would be applied before sign above, exported here for test readability.
  ...validator
};

module.exports = api;
