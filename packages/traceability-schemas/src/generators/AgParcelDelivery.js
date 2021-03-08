const { generator, schemas } = require('../data/util/data');

const { faker } = generator;
const deliveryTypes = require('../data/generated/Shipping-types.json');
const { getPostalAddress } = require('./PostalAddress');
const { getPlace } = require('./Place');
const { getOrganization } = require('./Organization');
const { getAgPackage } = require('./AgPackage');

const getAgParcelDelivery = () => {
  // Get address
  const deliveryAddress = getPostalAddress();

  // Get Places
  const foreignPortExport = getPlace();

  const portOfEntry = getPlace();

  // Get organization
  const consignee = getOrganization();

  // Get AgPackage
  const agPackage = getAgPackage();

  // Include test data for delivery methods.
  const randomType = Object.keys(deliveryTypes)[
    faker.random.number(Object.keys(deliveryTypes).length - 1)
  ];
  const deliveryMethod = deliveryTypes[randomType].type;

  const originAddress = getPostalAddress();

  // delete deliveryAddress['@context'];
  // delete foreignPortExport['@context'];
  // delete portOfEntry['@context'];
  // delete consignee['@context'];
  // delete AgPackage['@context'];
  // delete originAddress['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'AgParcelDelivery',
    deliveryAddress,
    originAddress,
    foreignPortExport,
    portOfEntry,
    deliveryMethod,
    trackingNumber: faker.random
      .number({ min: 10000000, max: 999999999999 })
      .toString(),
    expectedArrival: '2021-03-14',
    specialInstructions:
      'The package is top-heavy so handle with appropriate caution.',
    consignee,
    AgPackage: [agPackage],
  };
  const ajv = generator.getAjv();
  const validate = ajv.compile(schemas.AgParcelDelivery);
  const validateResult = validate(example);
  if (process.env.VERBOSE_BUILD_AG) {
    console.log('Early Validation results from AgParcelDelivery:', validateResult);
    console.log('AJV Errors:', ajv.errors);
  }
  return example;
};

module.exports = { getAgParcelDelivery };
