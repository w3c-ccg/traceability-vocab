const faker = require('faker');

faker.seed(42);
const { getEntity } = require('./Entity');
const { getQuantitativeValue } = require('./QuantitativeValue');

const getUsmcaProductSpecifier = () => {
  // Get Entity
  const manufacturer = getEntity();
  delete manufacturer['@context'];

  // Get Quantitative Value for Size
  const sizeOrAmount = getQuantitativeValue();
  delete sizeOrAmount['@context'];

  // Get Quantitative Value for Weight
  const weight = getQuantitativeValue();
  delete weight['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'UsmcaProductSpecifier',
    product: {
      '@context': ['https://w3id.org/traceability/v1'],
      type: ['Product'],
      sku: faker.random.number({ min: 10000000, max: 999999999999 }).toString(),
      description: 'Non-alloy steel rolls',
      commodity: {
        '@context': ['https://w3id.org/traceability/v1'],
        type: ['Commodity'],
        commodityCode: '721320',
        commodityCodeType: 'HS',
        description: 'Steel Coils',
      }
    },
    originCriterion: 'A',
    countryOfOrigin: 'MX',
  };
  return example;
};

module.exports = { getUsmcaProductSpecifier };
