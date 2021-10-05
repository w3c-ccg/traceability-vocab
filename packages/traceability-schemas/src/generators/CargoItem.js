const { getCargoLineItem } = require('./CargoLineItem');

const getCargoItem = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'CargoItem',
    cargoLineItems: getCargoLineItem(),
    carrierBookingReference: 'ABC709951',
    descriptionOfGoods: 'Break pads',
    HSCode: '68138100',
    weight: 13000,
    volume: 12,
    weightUnit: 'KGM',
    volumeUnit: 'CBM',
    numberOfPackages: 18,
    packageCode: '5H'

  };
  return example;
};

module.exports = { getCargoItem };
