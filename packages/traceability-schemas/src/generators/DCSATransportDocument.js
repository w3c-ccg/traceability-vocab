const { getDCSAShippingInstruction } = require('./DCSAShippingInstruction');
const { getPlace } = require('./Place');

const getDCSATransportDocument = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'DCSATransportDocument',
    shippingInstruction: getDCSAShippingInstruction(),
  };
  return example;
};

module.exports = { getDCSATransportDocument };
