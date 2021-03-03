const faker = require('faker');
const { getCustomer } = require('./Customer');
const { getOrderedItem } = require('./OrderedItem');
const { getPerson } = require('./Person');
// Include test data for order statuses
const orderstatus = require('../data/generated/orderstatus-types.json');
// Include payment methods
const payments = require('../data/generated/payment-types.json');

const getEcommerceOrderRegistrationEvidenceDocument = () => {
  // get an order status
  const randomStatus = faker.random.number({
    min: 1,
    max: orderstatus.status.length,
  });
  const OrderStatus = orderstatus.status[randomStatus - 1];

  // get a payment method
  const randomPayment = faker.random.number({
    min: 1,
    max: payments.payment.length,
  });
  const paymentMethod = payments.payment[randomPayment - 1];

  // create a list of ordered products
  let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
  const orderlist = [];
  while (numItemsinOrder > 0) {
    orderlist.push(getOrderedItem());
    numItemsinOrder -= 1;
  }
  // End ordered products list
  // create seller, broker, customer
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
  const seller = {
    type: 'Organization',
    name: name1,
    leiCode: lei1,
  };
  const broker = {
    type: 'Organization',
    name: name2,
    leiCode: lei2,
  };

  // customer name in order description
  const person = getPerson();

  const orderDate = new Date(faker.date.recent());
  const paymentDate = new Date(faker.date.future());
  const orderNumber = `Order#${faker.random.number({ min: 1, max: 999 })}`;
  const orderdate = `${orderDate.getMonth()}-${orderDate.getDay()}-${orderDate.getFullYear()}`;

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceOrderRegistrationEvidenceDocument',
    orderNumber,
    orderDate: orderdate,
    orderStatus: OrderStatus,
    description: `New Order For ${person.firstName} ${person.lastName}`,
    url: `${faker.internet.url()}?queryid=${orderNumber}`,
    seller,
    broker,
    customer: getCustomer(),
    paymentDueDate: `${paymentDate.getMonth()}-${paymentDate.getDay()}-${paymentDate.getFullYear()}`,
    paymentMethod,
    orderedItem: orderlist,
  };
  return example;
};

module.exports = { getEcommerceOrderRegistrationEvidenceDocument };
