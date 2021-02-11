const faker = require('faker');
faker.seed(42);
const mask = require('json-mask');
const { getPlace } = require('./Place');
const { getAgInspectionReport } = require('./AgInspectionReport');

const getppq203 = () => {

  // pull in outside schemas and remove the unneeded properties.  
  //Use JSON-mask (https://github.com/nemtsov/json-mask) to pull in only the properties needed for PPQ

  const fullForeignPortExport = getPlace();
  delete fullForeignPortExport['@context'];
  const exportFields = 'type,address(type,addressLocality,addressCountry)';
  const foreignPortExport = mask(fullForeignPortExport, exportFields);

  const fullPortOfEntry = getPlace();
  delete fullPortOfEntry['@context'];
  const portFields = 'type,address(type,addressLocality,addressRegion)';
  const portOfEntry = mask(fullPortOfEntry, portFields);

  const fullAgInspectionReport = getAgInspectionReport();
  // It may make more sense in the future to only pull in the values that are specifically applicable to to ppq203 but in the future we plan on 
  //structuring the schemas slightly differently with classes and subclasses, so including all agInspection properties makes most sense right now
  //const fields = 'type,facility(address),inspector(type,person(type,firstName,lastName)),shipment(type,deliveryAddress(type,*),originAddress(type,*)),AgPackage(AgProducts(products(type,name,description,sizeOrAmount,weight,sku))),applicant(type,firstName,lastName,name,address,worksFor(address),inspectionDate)';
  //const AgInspectionReport = mask(fullAgInspectionReport, fields);
  const AgInspectionReport = fullAgInspectionReport;
  const sigDate = new Date(faker.date.recent());
  AgInspectionReport["type"] = "ppq203";
  AgInspectionReport.certificateNumber = faker.random.number({ min: 10000000, max: 999999999999 }).toString();
  AgInspectionReport.foreignPortExport = foreignPortExport;
  AgInspectionReport.carrierId = faker.random.number({ min: 10000000, max: 999999999999 }).toString();
  AgInspectionReport.portOfEntry = portOfEntry;
  AgInspectionReport.signatureDate = sigDate.getFullYear() + "-02-16";;
  return AgInspectionReport;
};

module.exports = { getppq203 };
