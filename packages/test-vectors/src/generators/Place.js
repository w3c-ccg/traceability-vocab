
const { getPostalAddress } = require('./PostalAddress');
const { getGeoCoordinates } = require('./GeoCoordinates');
const { getGlobalLocationNumber } = require('./GS1')
const getPlace = () => {
    const example = {
        "@context": ['https://w3id.org/traceability/v1'],
        globalLocationNumber: getGlobalLocationNumber(),
        geo: getGeoCoordinates(),
        address: getPostalAddress(),
    }
    return example;
}

module.exports = { getPlace }