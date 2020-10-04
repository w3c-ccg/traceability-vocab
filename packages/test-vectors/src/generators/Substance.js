const faker = require("faker");

const ptd = require("../../data/generated/periodic-table-data.json");

const getSubstance = () => {
  let randomElementName = Object.keys(ptd)[
    faker.random.number(Object.keys(ptd).length - 1)
  ];
  let randomElement = ptd[randomElementName];
  let name = randomElement.title;
  let symbol = randomElement.symbol;
  const example = {
    ingredientName: name,
    ingredientContentPercentage: `${faker.random.number({
      min: 0,
      max: 100,
    })}.${faker.random.number({ min: 0, max: 1000 })}`,
    formula: symbol,
    inchi: randomElement.inchi,
    inchikey: randomElement.inchikey,
  };
  return example;
};

module.exports = { getSubstance };
