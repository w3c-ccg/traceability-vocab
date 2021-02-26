
const { getTotalCharge } = require('./TotalCharge');
const { getchargeAndPaymentType } = require('./chargeAndPaymentType');


const getChargeDeclaration = () => {

// get a currency
    
    let weightCharge = getchargeAndPaymentType();
    delete weightCharge['@context'];
    let taxCharge = getchargeAndPaymentType();
    delete taxCharge['@context'];
    let otherChargesAgent = getchargeAndPaymentType();
    delete otherChargesAgent['@context'];
    let otherChargesCarrier = getchargeAndPaymentType();
    delete otherChargesCarrier['@context'];

    let charge = getTotalCharge();
    delete charge['@context'];
    
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'ChargeDeclaration',
    weightCharge,
    taxCharge,
    otherChargesAgent,
    otherChargesCarrier,
    totalCharge: charge
  };
  return example;
};

module.exports = { getChargeDeclaration };
