const faker = require('faker');

const getGeoCoordinates = () => {
    const example = {
        "latitude": faker.address.latitude(),
        "longitude": faker.address.longitude(),
    }
    return example;
}

module.exports = { getGeoCoordinates }