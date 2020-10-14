const faker = require("faker");

const { getChemicalProperty } = require("./ChemicalProperty");
const { getMechanicalProperty } = require("./MechanicalProperty");

const getMeasuredProperty = () => {
  const randomType = faker.random.arrayElement(["chemical", "mechanical"]);

  if (randomType == "chemical") {
    return getChemicalProperty();
  }

  return getMechanicalProperty();
};

module.exports = { getMeasuredProperty };
