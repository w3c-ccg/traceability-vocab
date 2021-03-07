const { generator, schemas } = require('../data/util/data');

const { faker } = generator;

const ajv = generator.getAjv();

const getCommercialInvoice = () => {
    const example = {
      '@context': ['https://w3id.org/traceability/v1'],
      type: 'CommercialInvoice',
      examples: []
    };
    const validate = ajv.compile(schemas.CommercialInvoice);
    const validateResult = validate(example);
    if (process.env.VERBOSE_BUILD_GENERAL) {
      console.log('Early Validation results from CommercialInvoice:', validateResult);
    }
    return example;
  };

  module.exports = { getCommercialInvoice };
