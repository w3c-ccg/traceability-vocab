const faker = require('faker');
const identifiers = require('../../data/generated/orderVCIDs.json');

const getEcommerceAddProductCodeRegistrationCredential = () => {
  const Randnum = faker.random.number({ min: 1, max: 3 });

  if (Randnum === 1) {
    ProductCodeType = 'UPC';
    itemVCID = identifiers.order[0];
    certname = 'ACME Ecommerce Universal Product Code Product Registration Certificate';
  }
  if (Randnum === 2) {
    ProductCodeType = 'CO';
    itemVCID = identifiers.order[1];
    certname = 'ACME Ecommerce Country of Origin Code Product Registration Certificate';
  }
  if (Randnum === 3) {
    ProductCodeType = 'HTS';
    itemVCID = identifiers.order[0];
    certname = 'ACME Ecommerce HTS Code Product Registration Certificate';
  }

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceAdditionalProductCodeRegistrationCredential',
    productVCid: itemVCID,
    addProductCode: faker.random.number({ min: 10000000000000, max: 99999999999999 }),
    addProductCodeType: ProductCodeType,
    certificateName: certname,
  };

  return example;
};

module.exports = { getEcommerceAddProductCodeRegistrationCredential };
