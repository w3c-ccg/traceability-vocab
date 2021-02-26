const faker = require('faker');
// Include currencies
const currencies = require("../../data/generated/currency-format.json");


const getTotalCharge = () => {

// get a currency
    let randNum = Object.keys(currencies)[
        faker.random.number(Object.keys(currencies).length - 1)
      ];
      let randNum1 = Object.keys(currencies)[
        faker.random.number(Object.keys(currencies).length - 1)
      ];
    const currency = currencies[randNum].code;
    const currency1 = currencies[randNum1].code
    let total = faker.random.number({ min: 10, max: 10000 });
    let totalPrepaid = 0.75*total;
    let totalCollect = 0.25*total;
    let chargesDestination = faker.random.number({ min: 10, max: 1000 });
    let totalCollectCharge = 0.25*chargesDestination;
    
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'TotalCharge',
    totalPrepaid,
    totalCollect,
    sourceCurrency: currency,
    destinationCurrency: currency1,
    currencyConversionRate: faker.random.number({ min: 1, max: 5 }),
    ccChargesDestinationCurrency: currency,
    chargesDestination,
    totalCollectCharge
  };
  return example;
};

module.exports = { getTotalCharge };
