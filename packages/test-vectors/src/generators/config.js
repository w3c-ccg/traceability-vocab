const { getPlace } = require('./Place');
const { getPostalAddress } = require('./PostalAddress');
const { getGeoCoordinates } = require('./GeoCoordinates');
const { getPercentComposition } = require('./PercentComposition');

const generatorConfig = {
    "Place": getPlace,
    "PostalAddress": getPostalAddress,
    "GeoCoordinates": getGeoCoordinates,
    "PercentComposition": getPercentComposition,
}

module.exports = generatorConfig;