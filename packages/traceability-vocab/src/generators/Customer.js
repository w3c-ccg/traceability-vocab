const faker = require('faker');
const { getPostalAddress } = require('./PostalAddress');
const { getPerson } = require('./Person');


const getCustomer = () => {
  
  const person = getPerson();
  delete person['@context'];
  const address = getPostalAddress();
  delete address['@context'];
  delete address.organizationName;

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'Customer',
    name: `${person.firstName} ${person.lastName}`,
    address,
    telephone: person.phoneNumber,
    email: person.email,
  };
  return example;
};

module.exports = { getCustomer };
