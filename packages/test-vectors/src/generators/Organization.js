const faker = require('faker');
const { getPostalAddress } = require('./PostalAddress');

const getOrganization = () => {

    //Get address 
    const address = getPostalAddress();
    delete address['@context'];
    //remove Organization name from the PostalAddress schema we're pulling in
    delete address['organizationName'];

    const example = {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'Organization',
        name: faker.company.companyName(),
        description: faker.company.catchPhrase(),
        address,
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber()
    };
    return example;
};

module.exports = { getOrganization };
