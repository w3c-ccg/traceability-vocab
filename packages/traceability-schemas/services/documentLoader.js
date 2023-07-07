const { contexts } = require('./contexts');

const documentLoader = async (iri) => {
  if (!iri) {
    throw new Error('document loader called on undefined iri...');
  }
  if (contexts[iri]) {
    return { document: contexts[iri] };
  }
  const message = `Unsupported iri: ${iri}`;
  console.error(message);
  throw new Error(message);
};

module.exports = documentLoader;
