// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

const ptd = require('../data/generated/periodic-table-data.json');

const getChemicalProperty = () => {
  const randomElementName = Object.keys(ptd)[
    faker.random.number(Object.keys(ptd).length - 1)
  ];
  const randomElement = ptd[randomElementName];
  const name = randomElement.title;
  const { symbol } = randomElement;
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'ChemicalProperty',
    name,
    formula: symbol,
    inchi: randomElement.inchi,
    inchikey: randomElement.inchikey,
  };
  return example;
};

module.exports = { getChemicalProperty };
