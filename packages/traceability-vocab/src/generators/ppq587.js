const faker = require('faker');

faker.seed(42);
const { getAgInspectionReport } = require('./AgInspectionReport');

const getppq587 = () => {
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

  const AgInspectionReport = fullAgInspectionReport;
  const sigDate = new Date(faker.date.recent());

  // delete the AgInspection Fields not represented on the ppq587 form
  delete AgInspectionReport.inspector;
  delete AgInspectionReport.inspectionDate;
  delete AgInspectionReport.inspectionType;
  delete AgInspectionReport.observation;

  AgInspectionReport.type = 'ppq587';
  AgInspectionReport.signatureDate = `${sigDate.getFullYear()}-02-16`;
  AgInspectionReport.intendedUse = 'Fruits and Vegetables';
  return AgInspectionReport;
};

module.exports = { getppq587 };
