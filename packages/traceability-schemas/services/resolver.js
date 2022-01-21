const didKey = require('@transmute/did-key.js');

const resolve = async (did) => {
  const { didDocument } = await didKey.resolve(did, {
    accept: 'application/did+json',
  });
  return didDocument;
};

module.exports = { resolve };
