// const faker = require('faker');

const { getEntity } = require('./Entity');

const getPurchase = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'Purchase',
    customer: getEntity(),
  };
  return example;
};

module.exports = { getPurchase };
