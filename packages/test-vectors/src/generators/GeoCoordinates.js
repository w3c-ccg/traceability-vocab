const faker = require('faker');

const getGeoCoordinates = () => {
    const example = {
        "@context": ['https://w3id.org/traceability/v1'],
        "latitude": faker.address.latitude(),
        "longitude": faker.address.longitude(),
    }
    return example;
}

module.exports = { getGeoCoordinates }