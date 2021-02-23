const faker = require('faker');
const { getLEIentity } = require('./LEIentity');
const { getLEIregistration } = require('./LEIregistration');

const getLEIevidenceDocument = () => {

  const shortId = `${faker.random.alpha({ count: 4 }).toUpperCase()}`;
  const lei = faker.random.alphaNumeric(20).toUpperCase();

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'LEIevidenceDocument',
    lei,
    entity: getLEIentity(),
    registration: getLEIregistration(),
    bic: [`${faker.random.alpha({ count: 4 }).toUpperCase()}${faker.address.countryCode()}${shortId}`],
  };
  return example;
};

module.exports = { getLEIevidenceDocument };
