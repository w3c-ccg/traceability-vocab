const faker = require('faker');
// Include currencies
const currencies = require('../../data/generated/currency-format.json');

const getPriceSpecification = () => {
// get a currency
  const randNum = Object.keys(currencies)[
    faker.random.number(Object.keys(currencies).length - 1)
  ];
  const currency = currencies[randNum].code;

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'PriceSpecification',
    price: faker.random.number({ min: 10, max: 10000 }),
    priceCurrency: currency,
  };
  return example;
};

module.exports = { getPriceSpecification };
