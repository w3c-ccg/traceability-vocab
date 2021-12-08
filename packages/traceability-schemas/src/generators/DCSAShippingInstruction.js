const { getCargoItem } = require('./CargoItem');
const { getEntity } = require('./Entity');
const { getTransportEquipment } = require('./TransportEquipment');

const getDCSAShippingInstruction = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'DCSAShippingInstruction',
    shippingInstructionID: 'E0559d8308',
    transportDocumentType: 'SWB',
    cargoItems: getCargoItem(),
    utilizedTransportEquipments: getTransportEquipment(),
    shipper: getEntity(),
    consignee: getEntity(),
    firstNotify: getEntity(),
  };
  return example;
};

module.exports = { getDCSAShippingInstruction };
