// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

// https://www.gs1.org/services/how-calculate-check-digit-manually
const getCheckDigit = (data) => {
  let sum = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0) {
      sum += parseInt(data[i], 10) * 1;
    } else {
      sum += parseInt(data[i], 10) * 3;
    }
  }
  // eslint-disable-next-line no-mixed-operators
  const checkDigit = (10 - sum % 10) % 10;
  return checkDigit;
};

const getGlobalCompanyPrefix = () => faker.random.number({ min: 1000000, max: 9999999 });

// https://www.gs1.org/docs/Digital-Link/GS1_Digital_link_Standard_i1.1.pdf
// https://id.gs1.org/gln/0614141123452
const getGlobalLocationNumber = () => {
  const gcp = getGlobalCompanyPrefix();
  const locationReference = faker.random.number({ min: 10000, max: 99999 });
  const gln = `${gcp}${locationReference}`;
  const checkDigit = getCheckDigit(gln);
  return `${gln}${checkDigit}`;
};

module.exports = { getGlobalLocationNumber };
