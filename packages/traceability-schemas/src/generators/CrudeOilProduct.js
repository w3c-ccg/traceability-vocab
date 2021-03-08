const { generator, schemas } = require('../data/util/data');

const { faker } = generator;

const ajv = generator.getAjv();

const getCrudeOilProduct = () => {
    const example = {
      '@context': ['https://w3id.org/traceability/v1'],
      type: 'CrudeOilProduct',
      examples: []
    };
    const validate = ajv.compile(schemas.CrudeOilProduct);
    const validateResult = validate(example);
    if (process.env.VERBOSE_BUILD_OIL) {
      console.log('Early Validation results from CrudeOilProduct:', validateResult);
    }
    return example;
  };

  module.exports = { getCrudeOilProduct };
