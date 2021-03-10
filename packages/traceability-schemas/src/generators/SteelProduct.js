const faker = require('faker');

const { getInspectionReport } = require('./InspectionReport');

const getSteelProduct = () => {
  const inspection = getInspectionReport();
  delete inspection['@context'];
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'SteelProduct',
    heatNumber: `${faker.random.number()}`,
    specification: `ASTM-${faker.random.number()}`,
    grade: `${faker.random.number()}`,
    originalCountryOfMeltAndPour: faker.address.country(),
    inspection,
  };
  return example;
};

module.exports = { getSteelProduct };
