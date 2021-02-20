const faker = require('faker');
const { getPostalAddress } = require('./PostalAddress');
const { getPerson } = require('./Person');
// Include test data for ecom products.
const prods = require('../../data/generated/EcomProducts.json');
// Include payment methods
const payments = require('../../data/generated/payment-types.json');
// Include Payment Status
const paymentstatus = require('../../data/generated/payment-status.json');
// Include currencies
// const currencies = require("../../data/generated/currency-format.json");

const getEcommerceInvoiceRegistrationEvidenceDocument = () => {
  // get a payment method
  const randomPayment = faker.random.number({
    min: 1,
    max: payments.payment.length,
  });
  const paymentMethod = payments.payment[randomPayment - 1];
  // get a payment status
  const randomPaymentStatus = faker.random.number({
    min: 1,
    max: paymentstatus.status.length,
  });
  const paymentStatus = payments.payment[randomPaymentStatus - 1];
  // FIX ME
  // get a currency
  // const randomCurrency = Object.keys(currencies)[
  //   faker.random.number(Object.keys(currencies).length)
  // ];

  // const currency = currencies[randomCurrency].code;
  const currency = 'USD';

  // create a list of ordered products in invoice
  let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
  const orderlist = [];
  let totalPrice = 0;
  while (numItemsinOrder > 0) {
    const randomProd = faker.random.number({
      min: 0,
      max: Object.keys(prods).length - 1,
    });
    const quantity = faker.random.number({ min: 1, max: 10 });
    const itemOrderedName = prods[randomProd].name;
    const itemOrderedProduct = prods[randomProd].productID;
    const itemOrderedProductUnitPrice = prods[randomProd].price;
    const itemOrderedProductPrice = quantity * itemOrderedProductUnitPrice;
    const unitPriceSpecification = {
      type: 'UnitPriceSpecification',
      price: itemOrderedProductUnitPrice,
      priceCurrency: currency,
    };
    const priceSpecification = {
      type: 'PriceSpecification',
      price: itemOrderedProductPrice,
      priceCurrency: currency,
    };
    const item = {
      type: 'Product',
      name: itemOrderedName,
      productID: itemOrderedProduct,
      unitPriceSpecification,
      orderQuantity: quantity,
      priceSpecification,
    };
    orderlist.push(item);
    totalPrice += itemOrderedProductPrice;
    numItemsinOrder -= 1;
  }

  // check if invoice has already been paid, if yes set payment amount to 0 & construct total price

  if (
    paymentStatus === 'PaymentAutomaticallyApplied'
    || paymentStatus === 'PaymentComplete'
  ) {
    totalPrice = 0;
  }

  const totalpaymentdue = {
    type: 'PriceSpecification',
    price: totalPrice,
    priceCurrency: currency,
  };

  // End ordered products list in invoice

  // create seller, broker, customer, seller = provider for simplicity
  const name1 = faker.company.companyName();
  const lei1 = `2345${faker.random.number({
    min: 1000000000000000,
    max: 1999999999999999,
  })}`;
  const name2 = faker.company.companyName();
  const lei2 = `5432${faker.random.number({
    min: 1000000000000000,
    max: 1999999999999999,
  })}`;
  const Seller = {
    type: 'Organization',
    name: name1,
    leiCode: lei1,
  };
  const broker = {
    type: 'Organization',
    name: name2,
    leiCode: lei2,
  };
  const person = getPerson();
  delete person['@context'];
  const address = getPostalAddress();
  delete address['@context'];
  delete address.organizationName;
  const customer = {
    type: 'Person',
    name: `${person.firstName} ${person.lastName}`,
    address,
    telephone: person.phoneNumber,
    email: person.email,
  };

  const orderDate = new Date(faker.date.recent());
  const paymentDate = new Date(faker.date.future());
  const orderNumber = `Order#${faker.random.number({ min: 1, max: 999 })}`;

  const referencesOrderNew = [];
  const referencesOrder = {
    type: 'Order',
    description: `New Order For ${person.firstName} ${person.lastName}`,
    orderDate: `${orderDate.getMonth()}-${orderDate.getDay()}-${orderDate.getFullYear()}`,
    orderNumber,
    paymentMethod,
    orderedItem: orderlist,
    seller: Seller,
  };

  referencesOrderNew.push(referencesOrder);

  const invoiceNumber = `Invoice#${faker.random.number({ min: 1, max: 999 })}`;

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceInvoiceRegistrationEvidenceDocument',
    identifier: invoiceNumber,
    description: `Invoice For ${person.firstName} ${person.lastName} for ${orderNumber}`,
    url: `${faker.internet.url()}?queryid=${invoiceNumber}`,
    broker,
    accountId: `xxxx-xxxx-xxxx-${faker.random.number({
      min: 1000,
      max: 9999,
    })}`,
    customer,
    paymentDueDate: `${paymentDate.getMonth()}-${paymentDate.getDay()}-${paymentDate.getFullYear()}`,
    totalPaymentDue: totalpaymentdue,
    paymentStatus,
    provider: Seller,
    referencesOrder: referencesOrderNew,
  };
  return example;
};

module.exports = { getEcommerceInvoiceRegistrationEvidenceDocument };
