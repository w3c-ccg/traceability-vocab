const { getEntity } = require('./Entity');

const getIntentToImport = () => {
  const importer = getEntity();
  delete importer['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'IntentToImport',
    importer,
  };

  return example;
};

module.exports = { getIntentToImport };
