const faker = require('faker');
const { getLEIaddress } = require('./LEIaddress');
const { getLEIauthority } = require('./LEIauthority');

const getLEIentity = () => {
  const fakeFuture = new Date(faker.date.future());
  const futureDate = `${fakeFuture.getFullYear()}-${fakeFuture.getMonth()}-${fakeFuture.getDay()}`;

  const getStatus = () => {
    const types = ['REQUESTED', 'CONFIRMED', 'REJECTED', 'IN PROGRESS'];
    return faker.random.arrayElement(types);
  };

  const getCategory = () => {
    const types = ['Grocery', 'Industrial', 'Jewelery', 'Finance'];
    return faker.random.arrayElement(types);
  };

  const getLegalForm = () => {
    const types = ['CORPORATION', 'LLC'];
    return faker.random.arrayElement(types);
  };

  const lei = faker.random.alphaNumeric(20).toUpperCase();
  const language = faker.random.locale();
  const otherNames = [faker.company.companyName(), faker.company.companyName()];
  const companyName = faker.company.companyName();
  const region = faker.address.county();
  const addr1 = getLEIaddress();
  delete addr1['@context'];
  const addr2 = getLEIaddress();
  delete addr2['@context'];
  const auth = getLEIauthority();
  delete auth['@context'];


  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'LEIentity',
    legalName: companyName,
    legalNameLanguage: language,
    otherNames,
    transliteratedOtherNames: otherNames,
    legalAddress: addr1,
    headquartersAddress: addr2,
    registrationAuthority: auth,
    legalJurisdiction: region,
    entityCategory: getCategory(),
    legalForm: getLegalForm(),
    associatedEntity: {
        type: 'Organization',
        leiCode: lei,
        name: faker.company.companyName()
    },
    status: getStatus(),
    expirationDate: futureDate,
    expirationReason: faker.company.bs(),
    successorEntity: {
        type: 'Organization',
        leiCode: faker.random.alphaNumeric(20).toUpperCase(),
        name: faker.company.companyName(),
    },
    otherAddresses: [],
  };
  return example;
};

module.exports = { getLEIentity };
