const { getTotalCharge } = require('./TotalCharge');
const { getchargeAndPaymentType } = require('./chargeAndPaymentType');

const getChargeDeclaration = () => {
// get a currency

  const weightCharge = getchargeAndPaymentType();
  delete weightCharge['@context'];
  const taxCharge = getchargeAndPaymentType();
  delete taxCharge['@context'];
  const otherChargesAgent = getchargeAndPaymentType();
  delete otherChargesAgent['@context'];
  const otherChargesCarrier = getchargeAndPaymentType();
  delete otherChargesCarrier['@context'];

  const charge = getTotalCharge();
  delete charge['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'ChargeDeclaration',
    weightCharge,
    taxCharge,
    otherChargesAgent,
    otherChargesCarrier,
    totalCharge: charge,
  };
  return example;
};

module.exports = { getChargeDeclaration };
