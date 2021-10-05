const getTransportEquipment = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'TransportEquipment',
    equipmentReference: 'APZU4812090',
  };
  return example;
};

module.exports = { getTransportEquipment };

