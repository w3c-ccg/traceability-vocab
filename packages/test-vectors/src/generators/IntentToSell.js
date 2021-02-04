const faker = require('faker');
const { getProduct } = require('./Product');
const { getEntity } = require('./Entity');

const getIntentToSell = () => {
    const seller = getEntity();
    delete seller['@context'];

    const purchaser = getEntity();
    delete purchaser['@context'];

    const product = getProduct();
    delete product['@context'];

    const dDate = new Date(faker.date.recent());
    const fDate = new Date(faker.date.future());

    const example = {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'IntentToSell',
        seller: seller,
        purchaser: purchaser,
        product: product,
        declarationDate: dDate.getMonth() + "-" + dDate.getDay() + "-" + dDate.getFullYear(),
        sellByDate: fDate.getMonth() + "-" + fDate.getDay() + "-" + fDate.getFullYear()
    };

    return example;
};

module.exports = { getIntentToSell };
