const faker = require('faker');
const { getCredential } = require('./Credential');
const { getPerson } = require('./Person');

const getInspector = () => {
  // get credentials
  const credential = [];
  let numCreds = faker.random.number({ min: 1, max: 3 });
  while (numCreds > 0) {
    const cred = getCredential();
    delete cred['@context'];
    credential.push(cred);
    numCreds -= 1;
  }

  // Get Person
  const person = getPerson();
  delete person['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'Inspector',
    person,
    credential,
  };
  return example;
};

module.exports = { getInspector };
