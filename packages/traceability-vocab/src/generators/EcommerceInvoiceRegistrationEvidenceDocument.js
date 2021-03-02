const faker = require('faker');
const { getCustomer } = require('./Customer');
const { getOrderedItem } = require('./OrderedItem');
// Include test data for order statuses
const orderstatus = require('../../data/generated/orderstatus-types.json');
// Include payment methods
const payments = require('../../data/generated/payment-types.json');
// Include Payment Status
const paymentstatus = require('../../data/generated/payment-status.json');
// Include currencies
const currencies = require('../../data/generated/currency-format.json');

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
  const paymentStatus = paymentstatus.status[randomPaymentStatus - 1];

  // get a currency
  const randNum = Object.keys(currencies)[
    faker.random.number(Object.keys(currencies).length - 1)
  ];
  const currency = currencies[randNum].code;

  // create a list of ordered products in invoice

  let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
  const orderlist = [];
  let totalPrice = 0;
  while (numItemsinOrder > 0) {
    const item = getOrderedItem();
    delete item['@context'];
    orderlist.push(item);
    totalPrice += item.price;
    numItemsinOrder -= 1;
  }

  // check if invoice has already been paid, if yes set payment amount to 0 & construct total price

  if (
    paymentStatus === 'PaymentAutomaticallyApplied'
    || paymentStatus === 'PaymentComplete'
  ) {
    totalPrice = 0;
  }

  const totalpaymentdue = totalPrice;

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
  const customer = getCustomer();

  const orderDate = new Date(faker.date.recent());
  const paymentDate = new Date(faker.date.future());
  const paymentDueDate = `${paymentDate.getMonth()}-${paymentDate.getDay()}-${paymentDate.getFullYear()}`;
  const orderNumber = `Order#${faker.random.number({ min: 1, max: 999 })}`;
  // get an order status
  const randomStatus = faker.random.number({ min: 1, max: orderstatus.status.length });
  const OrderStatus = orderstatus.status[randomStatus - 1];

  const referencesOrderNew = [];
  const referencesOrder = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceOrderRegistrationEvidenceDocument',
    description: `New Order For ${customer.name}`,
    url: `${faker.internet.url()}?queryid=${orderNumber}`,
    orderNumber,
    orderDate: `${orderDate.getMonth()}-${orderDate.getDay()}-${orderDate.getFullYear()}`,
    orderStatus: OrderStatus,
    seller: Seller,
    broker,
    customer,
    paymentMethod,
    paymentDueDate,
    orderedItem: orderlist,
  };

  referencesOrderNew.push(referencesOrder);

  const invoiceNumber = `Invoice#${faker.random.number({ min: 1, max: 999 })}`;

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceInvoiceRegistrationEvidenceDocument',
    identifier: invoiceNumber,
    description: `Invoice For ${customer.name} for ${orderNumber}`,
    url: `${faker.internet.url()}?queryid=${invoiceNumber}`,
    broker,
    accountId: `xxxx-xxxx-xxxx-${faker.random.number({
      min: 1000,
      max: 9999,
    })}`,
    customer,
    paymentDueDate,
    totalPaymentDue: totalpaymentdue,
    totalPaymentDueCurrency: currency,
    paymentStatus,
    provider: Seller,
    referencesOrder: referencesOrderNew,
  };
  return example;
};

module.exports = { getEcommerceInvoiceRegistrationEvidenceDocument };
