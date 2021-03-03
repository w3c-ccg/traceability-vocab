const faker = require('faker');

const getInvoice = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'Invoice',
    identifier: `IN-${faker.random.number()}`,

  };
  return example;
};

module.exports = { getInvoice };
