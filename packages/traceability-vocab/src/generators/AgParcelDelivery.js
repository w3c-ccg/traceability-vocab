const faker = require('faker');

faker.seed(42);
const deliveryTypes = require('../../data/generated/Shipping-types.json');
const { getPostalAddress } = require('./PostalAddress');
const { getPlace } = require('./Place');
const { getOrganization } = require('./Organization');
const { getAgPackage } = require('./AgPackage');

const getAgParcelDelivery = () => {
  // Get address
  const deliveryAddress = getPostalAddress();
  delete deliveryAddress['@context'];

  // Get Places
  const foreignPortExport = getPlace();
  delete foreignPortExport['@context'];

  const portOfEntry = getPlace();
  delete portOfEntry['@context'];

  // Get organization
  const consignee = getOrganization();
  delete consignee['@context'];

  // Get AgPackage
  const AgPackage = getAgPackage();
  delete AgPackage['@context'];

  // Include test data for delivery methods.
  const randomType = Object.keys(deliveryTypes)[
    faker.random.number(Object.keys(deliveryTypes).length - 1)
  ];
  const deliveryMethod = deliveryTypes[randomType].type;

  const originAddress = getPostalAddress();
  delete originAddress['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'AgParcelDelivery',
    deliveryAddress,
    originAddress,
    foreignPortExport,
    portOfEntry,
    deliveryMethod,
    trackingNumber: faker.random.number({ min: 10000000, max: 999999999999 }).toString(),
    expectedArrival: '2021-03-14',
    specialInstructions: 'The package is top-heavy so handle with appropriate caution.',
    consignee,
    AgPackage,
  };
  return example;
};

module.exports = { getAgParcelDelivery };
