const _ = require('lodash');
const { getParcelDelivery } = require('./ParcelDelivery');
const { generator, schemas } = require('../data/util/data');
const { getOrganization } = require('./Organization');

const ajv = generator.getAjv();

const { getProduct } = require('./Product');
const { getPurchase } = require('./Purchase');

const blCarrier = getOrganization();
delete blCarrier['@context'];
blCarrier.name = 'National International Shipping Company';
blCarrier.phoneNumber = '+1 555-234-9983';

const consignorParty = getOrganization();
delete consignorParty['@context'];

const consigneeParty = getOrganization();
delete consigneeParty['@context'];

const notifyParty = getOrganization();
delete notifyParty['@context'];

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
    billOfLadingNumber: '991205182A',
    bookingNumber: '991205182',
    relatedDocuments: [purchase],
    scac: 'NISC',
    carrier: blCarrier,
    consignor: consignorParty,
    consignee: consigneeParty,
    notify: notifyParty,
    freight,
    firstArrivalPortLocation: {
      unLocode: 'USMOB'
    },
    lastExitPortLocation: {
      unLocode: 'MXATM'
    }
  };
  const validate = ajv.compile(schemas.BillOfLading);
  const validateResult = validate(example);
  if (process.env.VERBOSE_BUILD_GENERAL) {
    console.log('Early Validation results from BillOfLading:', validateResult);
  }
  return example;
};

module.exports = { getBillOfLading };
