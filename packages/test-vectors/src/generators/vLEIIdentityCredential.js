const faker = require('faker');

const getvLEIIdentityCredential = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'vLEIIdentityCredential',
    vLEIIdentityCredential: faker.lorem.sentence(),
  };

  return example;
};

module.exports = { getvLEIIdentityCredential };
