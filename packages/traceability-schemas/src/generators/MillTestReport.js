const { generator, schemas } = require('../data/util/data');

const ajv = generator.getAjv();

const { getOrganization } = require('./Organization');
const { getSteelProduct } = require('./SteelProduct');
const { getPurchase } = require('./Purchase');
const { getParcelDelivery } = require('./ParcelDelivery');

const getMillTestReport = () => {
  const manufacturer = getOrganization();
  delete manufacturer['@context'];

  const product = getSteelProduct();
  delete product['@context'];

  const purchase = getPurchase();
  delete purchase['@context'];

  const shipment = getParcelDelivery();
  delete shipment['@context'];

  // Retain old version link:
  // https://github.com/w3c-ccg/traceability-vocab/blob/1397920e6e23893577753f7f51e4a9c786a746ee/docs/credentials/CertifidMillTestReportCredential.json
  const example = {
    '@context': 'https://w3id.org/traceability/v1',
    type: ['MillTestReport'],
    manufacturer,
    product,
    purchase,
    shipment,
  };

  const validate = ajv.compile(schemas.MillTestReport);
  const validateResult = validate(example);
  if (process.env.VERBOSE_BUILD_STEEL) {
    console.log(
      'Early Validation results from MillTestReport:',
      validateResult
    );
  }
  return example;
};

module.exports = { getMillTestReport };
