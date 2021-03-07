const { generator, schemas } = require('../data/util/data');

const { faker } = generator;

const ajv = generator.getAjv();

const getBillOfLading = () => {
    const example = {
      '@context': ['https://w3id.org/traceability/v1'],
      type: 'BillOfLading',
      examples: []
    };
    const validate = ajv.compile(schemas.BillOfLading);
    const validateResult = validate(example);
    if (process.env.VERBOSE_BUILD_GENERAL) {
      console.log('Early Validation results from BillOfLading:', validateResult);
    }
    return example;
  };

  module.exports = { getBillOfLading };
