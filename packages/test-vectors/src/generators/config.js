const { getPlace } = require("./Place");
const { getPostalAddress } = require("./PostalAddress");
const { getGeoCoordinates } = require("./GeoCoordinates");
const { getSubstance } = require("./Substance");
const { getSubstanceRecipe } = require("./SubstanceRecipe");

const generatorConfig = {
  Place: getPlace,
  PostalAddress: getPostalAddress,
  GeoCoordinates: getGeoCoordinates,
  Substance: getSubstance,
  SubstanceRecipe: getSubstanceRecipe,
};

module.exports = generatorConfig;
