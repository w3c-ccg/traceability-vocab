const faker = require("faker");

const { getSubstance } = require("./Substance");

const getSubstanceRecipe = () => {
  let numSubstances = faker.random.number({ min: 1, max: 3 });
  let recipeIngredient = [];

  while (numSubstances > 0) {
    const substance = getSubstance();
    recipeIngredient.push(substance);
    numSubstances -= 1;
  }

  let sum = recipeIngredient
    .map((r) => {
      return parseFloat(r.ingredientContentPercentage);
    })
    .reduce(function (a, b) {
      return a + b;
    }, 0);

  recipeIngredient = recipeIngredient.map((r) => {
    return {
      ...r,
      ingredientContentPercentage: `${(
        (100 * parseFloat(r.ingredientContentPercentage)) /
        sum
      ).toPrecision(5)}`,
    };
  });

  const example = {
    recipeIngredient,
  };
  return example;
};

module.exports = { getSubstanceRecipe };
