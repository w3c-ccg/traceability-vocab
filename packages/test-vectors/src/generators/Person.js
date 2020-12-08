const faker = require('faker');
const { getOrganization } = require('./Organization');

const getPerson = () => {

    //Get organization
    const worksFor = getOrganization();
    delete worksFor['@context'];

    const example = {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'Person',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
        worksFor,
        jobTitle: faker.name.jobTitle()
    };
    return example;
};

module.exports = { getPerson };
