const faker = require('faker');

const getLEIauthority = () => {
  const getRegCode = () => {
    const types = ['RA000001', 'RA000002', 'RA000003', 'RA000004', 'RA000661', 'RA000005'];
    return faker.random.arrayElement(types);
  };

  const id = faker.random.alphaNumeric(8).toUpperCase();
  const regid = faker.random.alphaNumeric(20).toUpperCase();

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'LEIauthority',
    validationAuthorityID: getRegCode(),
    otherValidationAuthorityID: id,
    validationAuthorityEntityID: regid,

  };
  return example;
};

module.exports = { getLEIauthority };
