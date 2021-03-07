const { generator, schemas } = require('../data/util/data');

const { getAgInspectionReport } = require('./AgInspectionReport');

const { faker } = generator;

const getppq203 = () => {
  // pull in outside schemas and remove the unneeded properties.
  // Use JSON-mask (https://github.com/nemtsov/json-mask) to pull in only the properties needed for PPQ

  const fullAgInspectionReport = getAgInspectionReport();
  // It may make more sense in the future to only pull in the values that are
  // specifically applicable to to ppq203 but in the future we plan on
  // structuring the schemas slightly differently with classes and subclasses,
  // so including all agInspection properties makes most sense right now
  const certNum = faker.random.number({ min: 10000000, max: 999999999999 }).toString();
  const exCarrier = faker.random.number({ min: 10000000, max: 999999999999 }).toString();
  const AgInspectionReport = fullAgInspectionReport;
  const sigDate = generator.dates.current;
  AgInspectionReport.type = 'ppq203';
  AgInspectionReport.certificateNumber = certNum;
  AgInspectionReport.carrierId = exCarrier;
  AgInspectionReport.signatureDate = generator.dates.current;

  const example = AgInspectionReport;
  const ajv = generator.getAjv();
  const validate = ajv.compile(schemas.AgActivity);
  const validateResult = validate(example);
  if (process.env.VERBOSE_BUILD_AG) {
    console.log('Early Validation results from AgActivity:', validateResult);
  }

  return example;
};

module.exports = { getppq203 };
