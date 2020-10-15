const faker = require('faker');

const getPostalAddress = () => {
    const example = {
        "@context": ['https://w3id.org/traceability/v1'],
        "type": "PostalAddress",
        "organizationName": faker.company.companyName(),
        "streetAddress": faker.address.streetAddress(),
        "addressLocality": faker.address.city(),
        "addressRegion": faker.address.state(),
        "postalCode": faker.address.zipCode(),
        "addressCountry": faker.address.country()
    }
    return example;
}

module.exports = { getPostalAddress }