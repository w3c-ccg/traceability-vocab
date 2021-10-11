const jsonldSchema = require('@transmute/jsonld-schema');
const rootTerms = require('../rootTerms.json');

const getContextFromIntermediate = (intermediate) => {
  const version = 1.1;
  return jsonldSchema.intermediateToContext(intermediate, version, rootTerms);
};

module.exports = getContextFromIntermediate;
