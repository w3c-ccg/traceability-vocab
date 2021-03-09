const faker = require('faker');
const _ = require('lodash');
const { getParcelDelivery } = require('./ParcelDelivery');

faker.seed(22);

const { getProduct } = require('./Product');
const { getPurchase } = require('./Purchase');

const getBillOfLading = () => {
  const product = getProduct();
  delete product['@context'];
  product.name = 'Crude Oil Barrel';
  product.description = 'Heavy Sour Dilbit';

  const freight = getParcelDelivery();
  const purchase = getPurchase();

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'BillOfLading',
    billOfLadingNumber: '991205182',
    relatedDocuments: [
        purchase
    ],
    freight,
  };
  return example;
};

module.exports = { getBillOfLading };
