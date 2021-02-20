const faker = require('faker');
// Include test data for ecom products.
const prods = require('../../data/generated/EcomProducts.json');
const orders = require('../../data/generated/orderVCIDs.json');

const getEcommercePackageRegistrationCredential = () => {
  // create a list of orderes for products in package
  let numOrdersinPackage = faker.random.number({ min: 1, max: Object.keys(orders).length });
  const packagelist = [];
  while (numOrdersinPackage > 0) {
    const itemOrder = orders.order[numOrdersinPackage];
    // create a list of ordered products
    let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
    const productlist = [];
    while (numItemsinOrder > 0) {
      const randomProd = faker.random.number({ min: 0, max: Object.keys(prods).length - 1 });
      const itemOrderedProduct = prods[randomProd].productID;
      productlist.push(itemOrderedProduct);
      numItemsinOrder -= 1;
    }
    const item = {
      type: 'EcommercePackageItem',
      productReceiptID: `https://vc.example.com/?queryID=${faker.random.hexaDecimal(64)}`,
      packingListID: `https://vc.example.com/?queryID=${faker.random.hexaDecimal(64)}`,
      orderID: itemOrder,
      productInOrder: productlist,
    };
    packagelist.push(item);
    numOrdersinPackage -= 1;
  }

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommercePackageRegistrationCredential',
    trackingID: `${faker.random.number({ min: 100000000000, max: 999999999999 })}`,
    packageItems: packagelist,
    certificateName: 'ACME Carrier Ecommerce Package Registration Certificate',
  };

  return example;
};

module.exports = { getEcommercePackageRegistrationCredential };
