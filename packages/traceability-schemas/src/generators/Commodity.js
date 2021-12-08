const { generator, schemas } = require('../data/util/data');

const ajv = generator.getAjv();

const getCommodity = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: ['Commodity'],
    commodityCode: '199301.20',
    commodityCodeType: 'HS',
    description: 'Rocket launchers; flame-throwers; grenade launchers; torpedo tubes and similar projectors',
  };
  const validate = ajv.compile(schemas.Commodity);
  const validateResult = validate(example);
  if (process.env.VERBOSE_BUILD_GENERAL) {
    console.log(
      'Early Validation results from Commodity:',
      validateResult
    );
  }
  return example;
};

module.exports = { getCommodity };
