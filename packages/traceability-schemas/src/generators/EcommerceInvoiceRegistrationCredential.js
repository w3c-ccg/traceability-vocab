const faker = require('faker');
// Include test data for ecom products.
const prods = require('../data/generated/EcomProducts.json');
const orders = require('../data/generated/orderVCIDs.json');

const getEcommerceInvoiceRegistrationCredential = () => {
  const invoiceNumber = `Invoice#${faker.random.number({ min: 1, max: 999 })}`;

  // create a list of orderes for products in invoice
  let numOrdersinInvoice = faker.random.number({
    min: 0,
    max: Object.keys(orders).length - 1,
  });
  const orderlist = [];
  while (numOrdersinInvoice > 0) {
    const itemOrder = orders.order[numOrdersinInvoice];
    orderlist.push(itemOrder);
    numOrdersinInvoice -= 1;
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
    type: 'EcommerceInvoiceRegistrationCredential',
    invoiceID: invoiceNumber,
    orderID: orderlist,
    productInOrder: productlist,
    certificateName: 'ACME Ecommerce Invoice Registration Certificate',
  };

  return example;
};

module.exports = { getEcommerceInvoiceRegistrationCredential };
