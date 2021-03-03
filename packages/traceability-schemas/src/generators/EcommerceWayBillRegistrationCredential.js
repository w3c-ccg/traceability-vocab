const faker = require('faker');
const { getOrganization } = require('./Organization');
const { getShippingStop } = require('./ShippingStop');

const getEcommerceWayBillRegistrationCredential = () => {
  const wayBillID = `ACMEWayBill#${faker.random.number({ min: 1, max: 999 })}`;

  const CarrierName = getOrganization();
  const carrierName = CarrierName.name;

  const getModeofTransport = () => {
    const types = ['Air', 'Sea', 'Truck', 'Rail'];
    return faker.random.arrayElement(types);
  };

  const portOfEntry = getShippingStop();
  delete portOfEntry['@context'];

  let numItemsinWayBill = faker.random.number({ min: 1, max: 10 });
  const packageVCID = [];
  while (numItemsinWayBill > 0) {
    const itemPackage = `https://vc.example.com/?queryID=${faker.random.hexaDecimal(64)}`;
    packageVCID.push(itemPackage);
    numItemsinWayBill -= 1;
  }

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceWayBillRegistrationCredential',
    wayBillID,
    carrierName,
    modeOfTransport: getModeofTransport(),
    portOfEntry,
    masterWayBill: 'No',
    wayBillVCID: [`https://vc.example.com/?queryID=${faker.random.hexaDecimal(64)}`],
    packageVCID,
    certificateName: 'ACME Carrier Ecommerce Way Bill Registration Certificate',
  };

  return example;
};

module.exports = { getEcommerceWayBillRegistrationCredential };
