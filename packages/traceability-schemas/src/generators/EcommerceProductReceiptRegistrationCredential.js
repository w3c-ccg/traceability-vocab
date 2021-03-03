const faker = require('faker');
// Include test data for ecom products.
const prods = require('../data/generated/EcomProducts.json');
const orders = require('../data/generated/orderVCIDs.json');

const getEcommerceProductReceiptRegistrationCredential = () => {
  const receiptNumber = `Receipt#${faker.random.number({ min: 1, max: 999 })}`;

  // create a list of packing list for products that have been received by shipper/carrier
  let numPLSinReceipt = faker.random.number({
    min: 1,
    max: Object.keys(orders).length,
  });
  const plslist = [];
  while (numPLSinReceipt > 0) {
    const itemPLS = orders.order[numPLSinReceipt - 1];
    plslist.push(itemPLS);
    numPLSinReceipt -= 1;
  }

  // create a list of orders for products that have been received by shipper/carrier
  let numOrdersinReceipt = faker.random.number({
    min: 1,
    max: Object.keys(orders).length,
  });
  const orderlist = [];
  while (numOrdersinReceipt > 0) {
    const itemOrder = orders.order[numOrdersinReceipt - 1];
    orderlist.push(itemOrder);
    numOrdersinReceipt -= 1;
  }

  // create a list of ordered products
  let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
  const productlist = [];
  while (numItemsinOrder > 0) {
    const randomProd = faker.random.number({
      min: 0,
      max: Object.keys(prods).length - 1,
    });
    const itemOrderedProduct = prods[randomProd].productID;
    productlist.push(itemOrderedProduct);
    numItemsinOrder -= 1;
  }

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceProductReceiptRegistrationCredential',
    receiptID: receiptNumber,
    packingListID: plslist,
    orderID: orderlist,
    productInOrder: productlist,
    certificateName:
      'ACME Carrier Ecommerce Product Receipt Registration Certificate',
  };

  return example;
};

module.exports = { getEcommerceProductReceiptRegistrationCredential };
