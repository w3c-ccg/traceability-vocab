const { getEntity } = require('./Entity');
const { getPlace } = require('./Place');
const { getProduct } = require('./Product');

const getEvent = () => {
    const eventType = 'commission';
    const eventId = '12345';
    const actor = [getEntity(), getEntity()];

    delete actor[0]['@context'];
    delete actor[1]['@context'];
    const place = getPlace();
    delete place['@context'];
    const eventTime = '2019-12-11T03:50:55Z';
    const products = [getProduct(), getProduct()];
    delete products[0]['@context'];
    delete products[1]['@context'];

    const example = {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'Event',
        eventType,
        eventId,
        actor,
        place,
        eventTime,
        products,
    };
    return example;
};

module.exports = { getEvent };
