const { getPlace } = require('./Place');
const { getPostalAddress } = require('./PostalAddress');
const { getGeoCoordinates } = require('./GeoCoordinates');

const generatorConfig = {
    "Place": getPlace,
    "PostalAddress": getPostalAddress,
    "GeoCoordinates": getGeoCoordinates,
}

module.exports = generatorConfig;