const getSeal = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'Seal',
    sealNumber: 'PTW-002290109692',
    sealSource: 'SHI',
    sealType: 'BLT'
  };
  return example;
};

module.exports = { getSeal };
