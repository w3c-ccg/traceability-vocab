const { getPlace } = require("./Place");
const { getPostalAddress } = require("./PostalAddress");
const { getGeoCoordinates } = require("./GeoCoordinates");
const { getSubstance } = require("./Substance");

const generatorConfig = {
  Place: getPlace,
  PostalAddress: getPostalAddress,
  GeoCoordinates: getGeoCoordinates,
  Substance: getSubstance,
};

module.exports = generatorConfig;
