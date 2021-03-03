const faker = require('faker');

faker.seed(42);
const { getPostalAddress } = require('./PostalAddress');

const getOrganization = () => {
  // Get address
  const address = getPostalAddress();
  delete address['@context'];

  // remove Organization name from the PostalAddress schema we're pulling in
  delete address.organizationName;

  // create phone number beginning with 555 to ensure no real number is used
  const phone = `555-${faker.random.number({ min: 100, max: 999 })}-${faker.random.number({ min: 1000, max: 9999 })}`;
  const fax = `555-${faker.random.number({ min: 100, max: 999 })}-${faker.random.number({ min: 1000, max: 9999 })}`;

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'Organization',
    name: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    address,
    email: faker.internet.exampleEmail(),
    phoneNumber: phone,
    faxNumber: fax,
  };
  return example;
};

module.exports = { getOrganization };
