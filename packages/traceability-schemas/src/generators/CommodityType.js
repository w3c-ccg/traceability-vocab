const getCommodityType = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'CommodityType',
    commodityDescription: 'Flat-rolled products of iron or nonalloy steel, of a width of 600 mm or more, hot-rolled, not clad, plated or coated: Of a thickness of less than 3 mm High-strength steel.',
    commodityCode: '7208.26.0030',
    commodityCodeScheme: 'HTS',
  };
  return example;
};

module.exports = { getCommodityType };
