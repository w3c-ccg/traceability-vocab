const faker = require("faker");

const { getChemicalProperty } = require("./ChemicalProperty");
const { getMechanicalProperty } = require("./MechanicalProperty");

const getMeasuredProperty = () => {
  const randomType = faker.random.arrayElement(["chemical", "mechanical"]);

  if (randomType == "chemical") {

    const prop = getChemicalProperty();
    return prop;
  }

  const prop = getMechanicalProperty();
  return prop;
};

module.exports = { getMeasuredProperty };
