const faker = require('faker');
faker.seed(42);
const { getProduct } = require('./Product');
const { getEntity } = require('./Entity');

const getIntentToSell = () => {
  const seller = getEntity();
  delete seller['@context'];

  const purchaser = getEntity();
  delete purchaser['@context'];

  const product = getProduct();
  delete product['@context'];

  //pulling auto date gen for use in test vectors for this object to reduce merge conflicts in the future
  // const dDate = new Date(faker.date.recent());
  // const fDate = new Date(faker.date.future());

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'IntentToSell',
    seller,
    purchaser,
    product,
    declarationDate: "2020-03-21",
    sellByDate: "2021-06-30",
  };

  return example;
};

module.exports = { getIntentToSell };
