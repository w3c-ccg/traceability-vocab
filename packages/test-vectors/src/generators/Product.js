const faker = require('faker');

faker.seed(42);
const { getEntity } = require('./Entity');
const { getQuantitativeValue } = require('./QuantitativeValue');

const getProduct = () => {
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
    type: 'Product',
    manufacturer,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    sizeOrAmount,
    weight,
    sku: faker.random.number({ min: 10000000, max: 999999999999 }).toString(),

  };
  return example;
};

module.exports = { getProduct };
