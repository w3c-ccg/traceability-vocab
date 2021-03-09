const _ = require('lodash');
const { getParcelDelivery } = require('./ParcelDelivery');
const { generator, schemas } = require('../data/util/data');

const { faker } = generator;
const ajv = generator.getAjv();

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
  const validate = ajv.compile(schemas.BillOfLading);
    const validateResult = validate(example);
    if (process.env.VERBOSE_BUILD_GENERAL) {
      console.log('Early Validation results from BillOfLading:', validateResult);
    }
  return example;
};

module.exports = { getBillOfLading };
