const { getCommodityType } = require('./CommodityType');
const { getEntity } = require('./Entity');

const getIntentToImport = () => {
  const importer = getEntity();
  delete importer['@context'];

  const commodity = getCommodityType();
  delete commodity['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'IntentToImport',
    importer,
    commodity,
  };

  return example;
};

module.exports = { getIntentToImport };
