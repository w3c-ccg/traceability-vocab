const faker = require('faker');

faker.seed(42);
const getQualification = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'Qualification',
    qualificationCategory: faker.name.jobTitle(),
    qualificationValue: faker.name.jobType(),
  };
  return example;
};

module.exports = { getQualification };
