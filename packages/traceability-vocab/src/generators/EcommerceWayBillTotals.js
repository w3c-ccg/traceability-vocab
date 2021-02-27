
const faker = require('faker');
const { getchargeSpecification } = require('./chargeSpecification');


const getEcommerceWayBillTotals = () => {

// get a currency
    
let totalPieces = faker.random.number({ min: 10, max: 1000 });
let weight = faker.random.number({ min: 10000, max: 1000000 });
let chargeableWeight = 0.9*weight;

const getWeightUnit = () => {
    const types = ['lb','kg'];
    return faker.random.arrayElement(types);
  };

let totalRateCharge = getchargeSpecification();
delete totalRateCharge['@context'];

let rateCharge = totalRateCharge.price / chargeableWeight;
    
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceWayBillTotals',
    totalPieces,
    weight,
    chargeableWeight,
    weightUnit: getWeightUnit(),
    rateCharge,
    totalRateCharge
  };
  return example;
};

module.exports = { getEcommerceWayBillTotals };
