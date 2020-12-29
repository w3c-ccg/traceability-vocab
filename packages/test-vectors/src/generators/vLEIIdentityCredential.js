const faker = require('faker');

const getvLEIIdentityCredential = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'vLEIIdentityCredential',
    vLEIIdentityCredential: faker.lorem.sentence(),
  };

  // const example = {
  //   '@context': ['https://w3id.org/traceability/v1'],
  //   type: 'GeoCoordinates',
  //   latitude: faker.address.latitude(),
  //   longitude: faker.address.longitude(),
  // };

  return example;
};

module.exports = { getvLEIIdentityCredential };
