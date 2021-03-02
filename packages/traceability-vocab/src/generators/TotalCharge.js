const faker = require('faker');
// Include currencies
const currencies = require('../../data/generated/currency-format.json');

const getTotalCharge = () => {
// get a currency
  const randNum = Object.keys(currencies)[
    faker.random.number(Object.keys(currencies).length - 1)
  ];
  const randNum1 = Object.keys(currencies)[
    faker.random.number(Object.keys(currencies).length - 1)
  ];
  const currency = currencies[randNum].code;
  const currency1 = currencies[randNum1].code;
  const total = faker.random.number({ min: 10, max: 10000 });
  const totalPrepaid = 0.75 * total;
  const totalCollect = 0.25 * total;
  const chargesDestination = faker.random.number({ min: 10, max: 1000 });
  const totalCollectCharge = 0.25 * chargesDestination;

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
    totalCollectCharge,
  };
  return example;
};

module.exports = { getTotalCharge };
