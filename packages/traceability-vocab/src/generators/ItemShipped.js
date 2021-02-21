const faker = require('faker');

const getItemShipped = () => {

  const product = faker.commerce.productName();

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'ItemShipped',
    manufacturer: faker.company.companyName(),
    name: product,
    description: faker.commerce.productDescription(),
    productID: `${faker.random.alphaNumeric(10).toUpperCase()}`,
    weight: `${faker.random.number({ min: 1, max: 5, precision: 0.001 })} lp`,
    height: `${faker.random.number({ min: 1, max: 10, precision: 0.001 })} in`,
    width: `${faker.random.number({ min: 1, max: 10, precision: 0.001 })} in`,
    depth: `${faker.random.number({ min: 1, max: 10, precision: 0.001 })} in`,
    orderQuantity: faker.random.number({ min: 1, max: 10}),
  };

  return example;
};

module.exports = { getItemShipped };
