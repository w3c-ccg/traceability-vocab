const faker = require('faker');
const { getOrganization } = require('./Organization');
const { getShippingStop } = require('./ShippingStop');

const getEcommerceBindingDataRegistrationCredential = () => {

    const finalVesselID = `ACMEVessel#${faker.random.number({ min: 1, max: 999 })}`;
    
    const CarrierName = getOrganization();
    const finalCarrierName = CarrierName.name;

    const getModeofTransport = () => {
        const types = ['Air','Sea','Truck', 'Rail'];
        return faker.random.arrayElement(types);
      };

    const NewDate = new Date(faker.date.future());
    let finalDateOfArrival = `${NewDate.getMonth()}-${NewDate.getDay()}-${NewDate.getFullYear()}`;

    let finalPortOfEntry = getShippingStop();
    delete finalPortOfEntry['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceBindingDataRegistrationCredential',
    finalCarrierName,
    finalVesselID,
    finalDateOfArrival,
    finalModeOfTransport: getModeofTransport(),
    finalPortOfEntry,
    wayBillVCID: [`https://vc.example.com/?queryID=${faker.random.hexaDecimal(64)}`],
    certificateName: 'ACME Carrier Ecommerce Binding Data Registration Certificate',
  };

  return example;
};

module.exports = { getEcommerceBindingDataRegistrationCredential };
