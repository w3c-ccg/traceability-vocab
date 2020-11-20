const faker = require('faker');
const { getCredential } = require('./Credential');

const getInspector = () => {
  let credential = [];
  let numCreds = faker.random.number({ min: 1, max: 3 });
  while (numCreds > 0) {
    const cred = getCredential();
    delete cred['@context'];
    credential.push(cred);
    numCreds -= 1;
  }
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'Inspector',
    person: faker.name.findName(),
    credential
  };
  return example;
};

module.exports = { getInspector };
