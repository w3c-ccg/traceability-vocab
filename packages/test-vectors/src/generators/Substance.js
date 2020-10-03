const faker = require("faker");

const getSubstance = () => {
  let name = "Titanium";
  let symbol = "Ti";
  const example = {
    ingredientName: name,
    ingredientContentPercentage: `${faker.random.number({
      min: 0,
      max: 100,
    })}.${faker.random.number({ min: 0, max: 1000 })}`,
    formula: symbol,
    inchi: `InChI=1S/${symbol}`,
    inchikey: "RTAQQCXQSZGOHL-UHFFFAOYSA-N",
  };
  return example;
};

module.exports = { getSubstance };
