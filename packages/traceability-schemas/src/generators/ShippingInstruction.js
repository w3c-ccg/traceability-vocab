const { getCargoItem } = require('./CargoItem');
const { getEntity } = require('./Entity');
const { getTransportEquipment } = require('./TransportEquipment');

const getShippingInstruction = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'ShippingInstruction',
    shippingInstructionID: 'E0559d8308',
    transportDocumentType: 'SWB',
    cargoItems: getCargoItem(),
    utilizedTransportEquipments: getTransportEquipment(),
    shipper: getEntity(),
    consignee: getEntity(),
  };
  return example;
};

module.exports = { getShippingInstruction };
