const faker = require('faker');

const getCredential = () => {
    const example = {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'Credential',
        credentialCategory: faker.person.jobTitle(),
        credentialValue: faker.person.jobType()
    };
    return example;
};

module.exports = { getCredential };
