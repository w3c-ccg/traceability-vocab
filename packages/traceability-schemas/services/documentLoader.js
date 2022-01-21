const { contexts } = require('./contexts');
const { resolve } = require('./resolver');

const documentLoader = async (iri) => {
  if (!iri) {
    throw new Error('document loader called on undefined iri...');
  }
  if (contexts[iri]) {
    return { document: contexts[iri] };
  }
  if (iri.startsWith('did:')) {
    const didDocument = await resolve(iri.split('#')[0]);
    return { document: didDocument };
  }
  const message = `Unsupported iri: ${iri}`;
  console.error(message);
  throw new Error(message);
};

module.exports = documentLoader;
