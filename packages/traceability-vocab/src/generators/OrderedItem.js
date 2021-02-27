const faker = require('faker');
// Include test data for ecom products.
const prods = require('../../data/generated/EcomProducts.json');

const getOrderedItem = () => {

    const randomProd = faker.random.number({ min: 0, max: Object.keys(prods).length - 1 });
    const quantity = faker.random.number({ min: 1, max: 10 });
    const itemOrderedName = prods[randomProd].name;
    const itemOrderedProduct = prods[randomProd].productID;
    const unitprice = faker.random.number({ min: 1, max: 10, precision: 2 });
    let price = quantity * unitprice;

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'OrderedItem',
    name: itemOrderedName,
    productID: itemOrderedProduct,
    unitPrice: unitprice,
    orderQuantity: quantity,
    price,    
  };
  return example;
};

module.exports = { getOrderedItem };
