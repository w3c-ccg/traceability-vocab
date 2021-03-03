const faker = require("faker");
// Include test data for ecom products.
const prods = require("../data/generated/EcomProducts.json");

const getEcommerceOrderRegistrationCredential = () => {
  const orderNumber = `Order#${faker.random.number({ min: 1, max: 999 })}`;

  // create a list of ordered products
  let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
  const orderlist = [];
  while (numItemsinOrder > 0) {
    const randomProd = faker.random.number({
      min: 0,
      max: Object.keys(prods).length - 1,
    });
    const itemOrderedProduct = prods[randomProd].productID;
    orderlist.push(itemOrderedProduct);
    numItemsinOrder -= 1;
  }

  const example = {
    "@context": ["https://w3id.org/traceability/v1"],
    type: "EcommerceOrderRegistrationCredential",
    orderID: orderNumber,
    productInOrder: orderlist,
    certificateName: "ACME Ecommerce Order Registration Certificate",
  };

  return example;
};

module.exports = { getEcommerceOrderRegistrationCredential };
