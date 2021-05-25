const faker = require('faker');
const { getOrganization } = require('./Organization');
const { getPlace } = require('./Place');
const { getProduct } = require('./Product');

const getEvent = () => {
    const eventType = 'commission';
    const eventId = '12345';
    const actor = [getOrganization(), getOrganization()];

    delete actor[0]['@context'];
    delete actor[1]['@context'];
    const eventLocation = getPlace();
    delete eventLocation['@context'];
    const eventTime = '';
    const products = [getProduct(), getProduct()];
    delete products[0]['@context'];
    delete products[1]['@context'];

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
