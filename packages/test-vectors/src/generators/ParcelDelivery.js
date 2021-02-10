const faker = require('faker');
const { getPostalAddress } = require('./PostalAddress');

const getParcelDelivery = () => {

  //Get address 
  const deliveryAddress = getPostalAddress();
  delete deliveryAddress['@context'];


  //Include test data for delivery methods.
  const deliveryTypes = require('../../data/generated/Shipping-types.json');
  const randomType = Object.keys(deliveryTypes)[
    faker.random.number(Object.keys(deliveryTypes).length - 1)
  ];
  const deliveryMethod = deliveryTypes[randomType].type;


  const originAddress = getPostalAddress();
  delete originAddress['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'ParcelDelivery',
    deliveryAddress,
    originAddress,
    deliveryMethod,
    trackingNumber: faker.random.number({ min: 10000000, max: 999999999999 }).toString()
  };
  return example;
};

module.exports = { getParcelDelivery };
