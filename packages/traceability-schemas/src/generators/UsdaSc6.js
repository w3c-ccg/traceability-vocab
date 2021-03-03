const faker = require('faker');

faker.seed(42);
const { getAgInspectionReport } = require('./AgInspectionReport');

const getUsdaSc6 = () => {
  // pull in outside schemas and remove the unneeded properties.
  // Use JSON-mask (https://github.com/nemtsov/json-mask) to pull in only the properties needed for PPQ

  const fullAgInspectionReport = getAgInspectionReport();
  // It may make more sense in the future to only pull in the values that are
  // specifically applicable to to ppq203 but in the future we plan on
  // structuring the schemas slightly differently with classes and subclasses,
  // so including all agInspection properties makes most sense right now const
  // fields =
  // 'type,facility(address),inspector(type,person(type,firstName,lastName)),
  // shipment(type,deliveryAddress(type,*),originAddress(type,*)),AgPackage
  // (AgProducts(products(type,name,description,sizeOrAmount,weight,sku))),
  // applicant(type,firstName,lastName,name,address,worksFor(address),
  // inspectionDate)';
  // const AgInspectionReport = mask(fullAgInspectionReport, fields);
  const serialNumber = faker.random.number({ min: 10000000, max: 999999999999 }).toString();
  const customsEntryNumber = faker.random.number({ min: 10000000, max: 999999999999 }).toString();
  const tariffCodeNumber = faker.random.number({ min: 10000000, max: 999999999999 }).toString();
  const lotId = faker.random.number({ min: 10000000, max: 999999999999 }).toString();
  const exCarrier = faker.random.number({ min: 10000000, max: 999999999999 }).toString();
  const AgInspectionReport = fullAgInspectionReport;
  const sigDate = new Date(faker.date.recent());
  // delete fields that are irrelevant to this form
  delete AgInspectionReport.inspectionType;
  delete AgInspectionReport.observation;

  AgInspectionReport.type = 'UsdaSc6';
  AgInspectionReport.serialNumber = serialNumber;
  AgInspectionReport.customsEntryNumber = customsEntryNumber;
  AgInspectionReport.tariffCodeNumber = tariffCodeNumber;
  AgInspectionReport.lotId = lotId;
  AgInspectionReport.carrierId = exCarrier;
  AgInspectionReport.dateOfEntry = `${sigDate.getFullYear()}-02-14`;
  AgInspectionReport.signatureDate = `${sigDate.getFullYear()}-02-16`;
  AgInspectionReport.importerSignatureDate = `${sigDate.getFullYear()}-02-15`;
  AgInspectionReport.intendedUse = 'Processing';
  AgInspectionReport.intendedUseCert = 'Processing';

  return AgInspectionReport;
};

module.exports = { getUsdaSc6 };
