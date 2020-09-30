
const { getPostalAddress } = require('./PostalAddress');
const { getGeoCoordinates } = require('./GeoCoordinates');

const getPlace = () => {
    const example = {
        address: getPostalAddress(),
        geo: getGeoCoordinates()
    }
    return example;
}

module.exports = { getPlace }