const faker = require('faker');
const { getPostalAddress } = require('./PostalAddress');
const { getProduct } = require('./Product');

const getParcelDelivery = () => {
  // Get address
  const deliveryAddress = getPostalAddress();
  delete deliveryAddress['@context'];

  const originAddress = getPostalAddress();
  delete originAddress['@context'];

  const products = [];
  let numProds = faker.random.number({ min: 1, max: 3 });
  while (numProds > 0) {
    const prod = getProduct();
    delete prod['@context'];
    products.push(prod);
    numProds -= 1;
  }

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'ParcelDelivery',
    deliveryAddress,
    originAddress,
    trackingNumber: faker.random.number({ min: 10000000, max: 999999999999 }).toString(),
    products,
  };
  return example;
};

module.exports = { getParcelDelivery };
