const { generator, schemas } = require('../data/util/data');

const { faker } = generator;

const { getOrganization } = require('./Organization');
const { getPlace } = require('./Place');
const { getPostalAddress } = require('./PostalAddress');

const ajv = generator.getAjv();

faker.seed(22);

const { getProduct } = require('./Product');

const getInbond = () => {
  const product = getProduct();
  delete product['@context'];
  product.name = 'Crude Oil Barrel';
  product.description = 'Heavy Sour Dilbit';
  const originAddress = getPostalAddress();
  const deliveryAddress = getPostalAddress();
  const carrier = getOrganization();
  const recipient = getOrganization();
  const portOfEntry = getPlace();
  const portOfDestination = getPlace();
  const portOfArrival = getPlace();

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'QPInbond',
    inBondNumber: '123456789',
    irsNumber: '12345678-01',
    inBondType: 'IT (61)',
    portOfEntry,
    carrier,
    recipient,
    portOfArrival,
    portOfDestination,
    shipment: {
      type: 'ParcelDelivery',
      originAddress,
      deliveryAddress,
      deliveryMethod: 'pipeline',
    },
    billOfLadingNumber: '123456789',
    expectedDeliveryDate: '2020-10-20',
    valuePerItem: faker.random.number({ min: 1000, max: 9999 }).toString(),
    totalOrderValue: faker.random.number({ min: 10000, max: 99999 }).toString(),
    product,
  };
  const validate = ajv.compile(schemas.InBond);
  const validateResult = validate(example);
  if (process.env.VERBOSE_BUILD_GENERAL) {
    console.log('Early Validation results from QPInbond:', validateResult);
  }
  return example;
};

module.exports = { getInbond };
