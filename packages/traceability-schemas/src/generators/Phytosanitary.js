const faker = require("faker");

faker.seed(42);
const mask = require("json-mask");
const { getPlace } = require("./Place");
const { getOrganization } = require("./Organization");
const { getAgInspectionReport } = require("./AgInspectionReport");
// Include test data for types of Phyto treatments.
const disinfectionTypes = require("../data/generated/Phytosanitary-types.json");

const getPhytosanitary = () => {
  const randomType = Object.keys(disinfectionTypes)[
    faker.random.number(Object.keys(disinfectionTypes).length - 1)
  ];
  const disinfectionTreatment = disinfectionTypes[randomType].type;
  const disinfectionChemical = disinfectionTypes[randomType].chemical;

  // pull in outside schemas and remove the unneeded properties. Use JSON-mask
  // (https://github.com/nemtsov/json-mask) to pull in only the properties
  // needed for this schema It may make more sense in the future to only pull
  // in the values that are specifically applicable to to ppq203 but in the
  // future we plan on structuring the schemas slightly differently with
  // classes and subclasses, so including all agInspection properties makes
  // most sense right now
  const fullAgInspectionReport = getAgInspectionReport();
  // const fields =
  // 'facility(address),notes,inspector(type,person(type,firstName,lastName)),
  // shipment(deliveryMethod,deliveryAddress(type,*),originAddress(type,*),
  // AgPackage(AgProducts (type,name,description,sizeOrAmount,weight,sku)),
  // applicant(type,worksFor(address,name)),inspectionDate';
  // const AgInspectionReport = mask(fullAgInspectionReport, fields);
  const AgInspectionReport = fullAgInspectionReport;

  const plantOrg = getOrganization();
  delete plantOrg["@context"];

  const fullPortOfEntry = getPlace();
  delete fullPortOfEntry["@context"];
  const portFields = "type,address(type,addressLocality,addressRegion)";
  const portOfEntry = mask(fullPortOfEntry, portFields);
  const exDuration = `${faker.random
    .number({ min: 30, max: 200 })
    .toString()} minutes`;

  const exTemp = {
    type: "MeasuredValue",
    value: faker.random.number({ min: 0, max: 25 }).toString(),
    unitCode: "Celsius",
  };
  const disDate = new Date(faker.date.recent());
  const exCon = {
    type: "MeasuredValue",
    value: faker.random.number({ min: 0, max: 50 }).toString(),
    unitCode: "Percent",
  };
  // faker.random.number({ min: 15, max: 50 }).toString();
  // const sigDate = new Date(faker.date.recent());
  const certNum = faker.random.number({ min: 10000000, max: 999999999999 });
  AgInspectionReport.type = "Phytosanitary";
  AgInspectionReport.certificateNumber = certNum.toString();
  AgInspectionReport.plantOrg = plantOrg;
  AgInspectionReport.distinguishingMarks = faker.lorem.sentence();
  AgInspectionReport.portOfEntry = portOfEntry;
  AgInspectionReport.additionalDeclaration = faker.lorem.sentence();
  AgInspectionReport.disinfectionDate = `${disDate.getFullYear()}-02-22`;
  AgInspectionReport.disinfectionTreatment = disinfectionTreatment;
  AgInspectionReport.disinfectionChemical = disinfectionChemical;
  AgInspectionReport.disinfectionDuration = exDuration;
  AgInspectionReport.disinfectionTemperature = exTemp;
  AgInspectionReport.disinfectionConcentration = exCon;
  AgInspectionReport.signatureDate = `${disDate.getFullYear()}-03-12`;
  return AgInspectionReport;
};

module.exports = { getPhytosanitary };
