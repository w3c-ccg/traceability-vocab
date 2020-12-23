const faker = require('faker');

const getvLEIIdentityCredential = () => {
  const example = {
    "vLEIIdentityCredential": faker.lorem.sentence(),
    type: 'vLEIIdentityCredential',
    '@context': ['https://w3id.org/traceability/v1'],
  };

  return example;
};

module.exports = { getvLEIIdentityCredential };
