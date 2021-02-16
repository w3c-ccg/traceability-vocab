const faker = require('faker');

const { getInspectionReport } = require('./InspectionReport');

const getSteelProduct = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'SteelProduct',
    grade: `${faker.random.number()}`,
    heatNumber: `${faker.random.number()}`,
    originalCountryOfMeltAndPour: faker.address.country(),
    inspection: getInspectionReport(),
  };
  return example;
};

module.exports = { getSteelProduct };
