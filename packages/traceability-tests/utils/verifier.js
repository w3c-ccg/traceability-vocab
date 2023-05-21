const jose = require('jose');
const validator = require('./validator');

// normally, you only accept certain issuers...
// this is for testing purposes...
const getPublicKey = async (didJwkUrl) => jose.importJWK(JSON.parse(jose.base64url.decode(didJwkUrl.split(':')[2].split('#')[0])));

const verifier = {
  verify: async (token) => {
    // decode header first,
    // don't look at payload until after verify.
    const { iss, kid } = jose.decodeProtectedHeader(token);
    const publicKey = await getPublicKey(`${iss}#${kid}`);
    const { payload, protectedHeader } = await jose.jwtVerify(token, publicKey);
    return { payload, protectedHeader };
  },
  // normally this would be applied before after verify above, exported here for test readability.
  ...validator,
};

const api = verifier;
module.exports = api;
