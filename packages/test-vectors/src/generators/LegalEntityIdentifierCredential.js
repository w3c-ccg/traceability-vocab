const faker = require('faker');

const getLegalEntityIdentifierCredential = () => {
  const lei = faker.random.alphaNumeric({count: 20}).toUpperCase()

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'LegalEntityIdentifierCredential',
    leiCode: lei,
  };

  return example;
};

module.exports = { getLegalEntityIdentifierCredential };
