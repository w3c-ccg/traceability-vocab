const faker = require('faker');
const { generator } = require('../data/util/data');
const { getPostalAddress } = require('./PostalAddress');
const { getOrganization } = require('./Organization');

const getShippingStop = () => {
  const shippingStopAddress = getPostalAddress();
  delete shippingStopAddress['@context'];

  const carrier = getOrganization();
  delete carrier['@context'];

  const vesselNumber = `ACMECarrierVessel#${faker.random.number({ min: 10, max: 1000 })}`;

  const newdate = new Date(faker.date.recent());

  const getStopType = () => {
    const types = ['Departure', 'Destination', 'Stopover'];
    return faker.random.arrayElement(types);
  };

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'ShippingStop',
    shippingStopAddress,
    carrier,
    vesselNumber,
    arrivalDate: generator.dates.current,
    stopType: getStopType(),
  };
  return example;
};

module.exports = { getShippingStop };
