const faker = require('faker');

const getLinkRole = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'LinkRole',
    target: faker.internet.url(),
    inLanguage: 'jp',
    linkRelationship: 'alternate',
  };
  return example;
};

module.exports = { getLinkRole };
