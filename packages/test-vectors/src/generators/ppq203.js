const faker = require('faker');
const mask = require('json-mask');
const { getPlace } = require('./Place');
const { getAgInspectionReport } = require('./AgInspectionReport');

const getppq203 = () => {

    // pull in outside schemas and remove the unneeded properties.  
    //In the future a much nicer way to do this would be to pass the needed properties into the get functions, but 
    //nested schemas and properties makes this complicated for now.

    const foreignPortExport = getPlace();
    delete foreignPortExport['@context'];
    delete foreignPortExport.globalLocationNumber;
    delete foreignPortExport.geo;
    delete foreignPortExport.address.organizationName;
    delete foreignPortExport.address.streetAddress;
    delete foreignPortExport.address.addressRegion;
    delete foreignPortExport.address.postalCode;

    const portOfEntry = getPlace();
    delete portOfEntry['@context'];
    delete portOfEntry.globalLocationNumber;
    delete portOfEntry.geo;
    delete portOfEntry.address.organizationName;
    delete portOfEntry.address.streetAddress;
    delete portOfEntry.address.postalCode;
    delete portOfEntry.address.addressCountry;

    const fullAgInspectionReport = getAgInspectionReport();

    const fields = 'type,facility(address),inspector(type,person(type,firstName,lastName)),shipment(type,deliveryAddress(type,*),originAddress(type,*),products(type, name, description, sizeOrAmount, weight, sku)),applicant(type,firstName,lastName,name,address,worksFor(address),inspectionDate)';
    const AgInspectionReport = mask(fullAgInspectionReport, fields);

    console.log(AgInspectionReport);

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
