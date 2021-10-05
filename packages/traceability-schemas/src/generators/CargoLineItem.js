const getCargoLineItem = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'CargoLineItem',
    cargoLineItemID: '3312591',
    shippingMarks: 'Premium break pads'
  };
  return example;
};

module.exports = { getCargoLineItem };
