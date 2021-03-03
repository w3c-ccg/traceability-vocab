const faker = require('faker');
const { getPriceSpecification } = require('./PriceSpecification');

const getEcommerceWayBillTotals = () => {
// get a currency

  const totalPieces = faker.random.number({ min: 10, max: 1000 });
  const weight = faker.random.number({ min: 10000, max: 1000000 });
  const chargeableWeight = 0.9 * weight;

  const getWeightUnit = () => {
    const types = ['lb', 'kg'];
    return faker.random.arrayElement(types);
  };

  const totalRateCharge = getPriceSpecification();
  delete totalRateCharge['@context'];

  const rateCharge = totalRateCharge.price / chargeableWeight;

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceWayBillTotals',
    totalPieces,
    weight,
    chargeableWeight,
    weightUnit: getWeightUnit(),
    rateCharge,
    totalRateCharge,
  };
  return example;
};

module.exports = { getEcommerceWayBillTotals };
