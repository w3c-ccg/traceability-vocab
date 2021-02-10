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
    seller,
    purchaser,
    product,
    declarationDate: `${dDate.getFullYear()}-03-21`,
    sellByDate: `${fDate.getFullYear()}-06-30`,
  };

  return example;
};

module.exports = { getIntentToSell };
