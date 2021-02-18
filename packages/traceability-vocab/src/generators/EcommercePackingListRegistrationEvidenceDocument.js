const faker = require('faker');
const { getPostalAddress } = require('./PostalAddress');
// Include test data for ecom products.
const prods = require('../../data/generated/EcomProducts.json');
// Include delivery methods
const deliverytype = require('../../data/generated/delivery-methods.json');
// Include delivery Status
const deliverystatus = require('../../data/generated/event-status.json');

const getEcommercePackingListRegistrationEvidenceDocument = () => {
  // get a delivery method
  const randomDelivery = faker.random.number({
    min: 1,
    max: deliverytype.methods.length,
  });
  const deliveryMethod = deliverytype.methods[randomDelivery - 1];
  // get a delivery status
  const randomDeliveryStatus = faker.random.number({
    min: 1,
    max: deliverystatus.status.length,
  });
  const deliveryStatus = deliverystatus.status[randomDeliveryStatus - 1];
  // create a list of ordered products in packing
  const orderNumber = `Order#${faker.random.number({ min: 1, max: 999 })}`;
  let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
  const productlist = [];
  while (numItemsinOrder > 0) {
    const randomProd = faker.random.number({
      min: 0,
      max: Object.keys(prods).length - 1,
    });
    const quantity = faker.random.number({ min: 1, max: 10 });
    const itemOrderedName = prods[randomProd].name;
    const itemOrderedProduct = prods[randomProd].productID;
    const itemOrderedDescription = faker.commerce.productDescription();
    const item = {
      '@type': 'Product',
      manufacturer: `${faker.company.companyName()}`,
      name: itemOrderedName,
      description: itemOrderedDescription,
      productID: itemOrderedProduct,
      weight: prods[randomProd].weight,
      height: prods[randomProd].height,
      width: prods[randomProd].width,
      depth: prods[randomProd].depth,
      orderQuantity: quantity,
    };
    productlist.push(item);
    numItemsinOrder -= 1;
  }
  // End ordered products list

  // combine order with item list

  const partoforder = [];
  const partofordernew = {
    '@type': 'Order',
    orderNumber,
    itemShipped: productlist,
  };
  partoforder.push(partofordernew);

  // create provider
  const name1 = faker.company.companyName();
  const lei1 = `2345${faker.random.number({
    min: 1000000000000000,
    max: 1999999999999999,
  })}`;
  const provider = {
    '@type': 'Corporation',
    name: name1,
    leiCode: lei1,
  };

  // create the required addresses
  const deliveryaddress = getPostalAddress();
  delete deliveryaddress['@context'];
  const originaddress = getPostalAddress();
  delete originaddress['@context'];

  const futureDate = new Date(
    `${faker.random.number({ min: 2030, max: 2040 })}`,
  );

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommercePackingListRegistrationEvidenceDocument',
    deliveryStatus,
    expectedArrivalFrom: `${futureDate}`,
    hasDeliveryMethod: deliveryMethod,
    deliveryAddress: deliveryaddress,
    provider,
    originAddress: originaddress,
    partOfOrder: partoforder,
  };
  return example;
};

module.exports = { getEcommercePackingListRegistrationEvidenceDocument };
