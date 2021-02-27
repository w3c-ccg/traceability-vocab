const faker = require('faker');
const { getOrganization } = require('./Organization');
const { getchargeSpecification } = require('./chargeSpecification');
// Include Payment Status
const paymentstatus = require('../../data/generated/payment-status.json');

const getIssuerAgent = () => {

    //get issuer agent
    let issuerAgentOrg = getOrganization();
    delete issuerAgentOrg['@context'];

    // get a payment status
    const randomPaymentStatus = faker.random.number({
        min: 1,
        max: paymentstatus.status.length,
    });
    const paymentStatus = paymentstatus.status[randomPaymentStatus - 1];

    let iataCode = `IATA#${faker.random.number({ min: 10, max: 1000 })}`;

    let accountNumber = faker.random.alphaNumeric({ count: 12 }).toUpperCase();
    
    const getDescription = () => {
        const types = ['Please charge to Account 123 and not Account 321','Please charge to Account 123 and Account 321','Please, only charge Account 123'];
        return faker.random.arrayElement(types);
      };
    
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'IssuerAgent',
    issuerAgentOrg,
    iataCode,
    accountNumber,
    accountingInformation: getDescription(),
    charge: getchargeSpecification(),
    declaredValueCarriage: getchargeSpecification(),
    declaredValueCarriagePaymentStatus: paymentStatus,
    declaredValueCustoms: getchargeSpecification(),
    declaredValueCustomsPaymentStatus: paymentStatus,
    amountInsurance: getchargeSpecification()
  };
  return example;
};

module.exports = { getIssuerAgent };
