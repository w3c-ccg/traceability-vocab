const faker = require('faker');
// Include test data for ecom products.
const { getItemShipped } = require('./ItemShipped');

const getPartOfOrder = () => {

    const getItem = () => {
        const item = getItemShipped();
        delete item['@context'];
        return item;
    };
    const ordernumber = `Order#${faker.random.number({ min: 1, max: 999 })}`;
    // create a list of ordered products
    let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
    const productlist = [];
    while (numItemsinOrder > 0) {
        productlist.push(getItem());
        numItemsinOrder -= 1;
    }

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'PartOfOrder',
    orderNumber: ordernumber,
    itemShipped: productlist,
  };

  return example;
};

module.exports = { getPartOfOrder };
