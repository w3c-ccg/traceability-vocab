const faker = require('faker');

faker.seed(42);
const { getQualification } = require('./Qualification');
const { getPerson } = require('./Person');

const getInspector = () => {
  // get qualifications
  const qualification = [];
  let numCreds = faker.random.number({ min: 1, max: 3 });
  while (numCreds > 0) {
    const cred = getQualification();
    delete cred['@context'];
    qualification.push(cred);
    numCreds -= 1;
  }

  // Get Person
  const person = getPerson();
  delete person['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'Inspector',
    person,
    qualification,
  };
  return example;
};

module.exports = { getInspector };
