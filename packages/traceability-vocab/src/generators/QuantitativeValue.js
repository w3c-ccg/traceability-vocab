const faker = require('faker');
// Include test data for Ag product units.
const prods = require('../../data/generated/AgProducts.json');

const getQuantitativeValue = () => {
  // get a product
  const randomProd = Object.keys(prods)[
    faker.random.number(Object.keys(prods).length - 1)
  ];
  const unitCode = prods[randomProd].Unit;

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'QuantitativeValue',
    unitCode,
    value: faker.random.number({ min: 10, max: 10000 }).toString(),
  };
  return example;
};

module.exports = { getQuantitativeValue };
