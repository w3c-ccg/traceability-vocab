const faker = require('faker');

const getCredential = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'Credential',
    credentialCategory: faker.name.jobTitle(),
    credentialValue: faker.name.jobType(),
  };
  return example;
};

module.exports = { getCredential };
