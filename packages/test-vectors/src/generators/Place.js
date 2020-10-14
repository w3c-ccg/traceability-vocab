
const { getPostalAddress } = require('./PostalAddress');
const { getGeoCoordinates } = require('./GeoCoordinates');
const { getGlobalLocationNumber } = require('./GS1')
const getPlace = () => {
    const example = {
        globalLocationNumber: getGlobalLocationNumber(),
        geo: getGeoCoordinates(),
        address: getPostalAddress(),

    }
    return example;
}

module.exports = { getPlace }