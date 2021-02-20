const faker = require('faker');
// Include test data for ecom products.
const prods = require('../../data/generated/EcomProducts.json');
const orders = require('../../data/generated/orderVCIDs.json');
const { getEcommercePackingListItem } = require('./EcommercePackingListItem');

const getEcommercePackingListRegistrationCredential = () => {

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommercePackingListRegistrationCredential',
    packageItems: getEcommercePackingListItem(),
    certificateName: 'ACME Ecommerce Packing List Registration Certificate',
  };

  return example;
};

module.exports = { getEcommercePackingListRegistrationCredential };
