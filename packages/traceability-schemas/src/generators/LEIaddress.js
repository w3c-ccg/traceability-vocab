const faker = require('faker');

const getLEIaddress = () => {
  const language = faker.random.locale();
  const companyName = faker.company.companyName();
  const country = faker.address.country();
  const region = faker.address.county();
  const addressNumber = `${faker.random.number({ min: 1, max: 500 })}`;
  const addressNumberWithinBuilding = `${faker.random.number({ min: 1, max: 10 })}`;

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'LEIaddress',
    language,
    addressLines: [companyName, faker.address.streetAddress()],
    addressNumber,
    addressNumberWithinBuilding,
    mailRouting: `${faker.address.streetAddress()}, ${faker.address.zipCode()}`,
    city: faker.address.city(),
    region,
    country,
    postalCode: faker.address.zipCode(),

  };
  return example;
};

module.exports = { getLEIaddress };
