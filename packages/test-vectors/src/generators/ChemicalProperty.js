const faker = require("faker");

const ptd = require("../../data/generated/periodic-table-data.json");

const getChemicalProperty = () => {
  let randomElementName = Object.keys(ptd)[
    faker.random.number(Object.keys(ptd).length - 1)
  ];
  let randomElement = ptd[randomElementName];
  let name = randomElement.title;
  let symbol = randomElement.symbol;
  const example = {
    "@context": ['https://w3id.org/traceability/v1'],
    type: "ChemicalProperty",
    name,
    formula: symbol,
    inchi: randomElement.inchi,
    inchikey: randomElement.inchikey,
  };
  return example;
};

module.exports = { getChemicalProperty };
