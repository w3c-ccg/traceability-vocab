const faker = require('faker');
const { getOrganization } = require('./Organization');
const { getPlace } = require('./Place');
const { getProduct } = require('./Product');

const getEvent = () => {
    const eventType = 'commission';
    const eventId = '12345';
    const actor = [getOrganization(), getOrganization()];
    const eventLocation = getPlace();
    const eventTime = '';
    const products = [getProduct(), getProduct()];

    const example = {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'Event',
        eventType,
        eventId,
        actor,
        eventLocation,
        eventTime,
        products,
    };
    return example;
};

module.exports = { getEvent };
