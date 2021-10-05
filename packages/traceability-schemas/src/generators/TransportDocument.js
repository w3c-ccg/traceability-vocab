const { getShippingInstruction } = require('./ShippingInstruction');
const { getPlace } = require('./Place');

const getTransportDocument = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'TransportDocument',
    shippingInstruction: getShippingInstruction(),
  };
  return example;
};

module.exports = { getTransportDocument };

