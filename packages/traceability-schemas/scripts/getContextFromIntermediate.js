const jsonldSchema = require('@transmute/jsonld-schema');
const rootTerms = require('../rootTerms.json');

const getContextFromIntermediate = (intermediate) => {
  const partialContext = jsonldSchema.intermediateToPartialContext(intermediate);
  return {
    '@context': {
      '@version': 1.1,
      '@vocab': 'https://w3id.org/traceability/#undefinedTerm',
      id: '@id',
      type: '@type',
      ...rootTerms,
      ...partialContext,
    },
  };
};

module.exports = getContextFromIntermediate;
