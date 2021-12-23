const fs = require('fs');
const path = require('path');

const contexts = {
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

const documentLoader = (iri) => {
  if (contexts[iri]) {
    return { document: contexts[iri] };
  }
  const message = `Unsupported iri: ${iri}`;
  console.error(message);
  throw new Error(message);
};

module.exports = documentLoader;
