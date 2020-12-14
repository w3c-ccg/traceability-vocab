const faker = require('faker');
const mask = require('json-mask');
const { getPlace } = require('./Place');
const { getAgInspectionReport } = require('./AgInspectionReport');

const getppq203 = () => {

    // pull in outside schemas and remove the unneeded properties.  
    //Use JSON-mask (https://github.com/nemtsov/json-mask) to pull in only the properties needed for PPQ

    const fullForeignPortExport = getPlace();
    delete fullForeignPortExport['@context'];
    const exportFields = 'type,address(type, addressLocality, addressCountry)';
    const foreignPortExport = mask(fullForeignPortExport, exportFields);

    const fullPortOfEntry = getPlace();
    delete fullPortOfEntry['@context'];
    const portFields = 'type,address(type, addressLocality, addressRegion)';
    const portOfEntry = mask(fullPortOfEntry, portFields);

    const fullAgInspectionReport = getAgInspectionReport();
    const fields = 'type,facility(address),inspector(type,person(type,firstName,lastName)),shipment(type,deliveryAddress(type,*),originAddress(type,*),products(type, name, description, sizeOrAmount, weight, sku)),applicant(type,firstName,lastName,name,address,worksFor(address),inspectionDate)';
    const AgInspectionReport = mask(fullAgInspectionReport, fields);

    const sigDate = new Date(faker.date.recent());

    const example = {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'ppq203',
        certificateNumber: faker.random.number({ min: 10000000, max: 999999999999 }).toString(),
        foreignPortExport,
        carrierId: faker.random.number({ min: 10000000, max: 999999999999 }).toString(),
        portOfEntry,
        signatureDate: sigDate.getMonth() + "-" + sigDate.getDay() + "-" + sigDate.getFullYear(),
        AgInspectionReport
    };
    return example;
};

module.exports = { getppq203 };
