const faker = require('faker');
const { getPostalAddress } = require('./PostalAddress');
const { getPerson } = require('./Person');
//Include test data for order statuses
const orderstatus = require('../../data/generated/orderstatus-types.json');
//Include test data for ecom products.
const prods = require('../../data/generated/EcomProducts.json');
//Include payment methods
const payments = require('../../data/generated/payment-types.json');

const getEcommerceOrderRegistrationEvidenceDocument = () => {
    //get an order status
    const randomStatus =
        faker.random.number({ min: 1, max: orderstatus.status.length });
    const orderStatus = orderstatus.status[randomStatus - 1];

    //get a payment method
    const randomPayment =
        faker.random.number({ min: 1, max: payments.payment.length });
    const paymentMethod = payments.payment[randomPayment - 1];

    //create a list of ordered products
    let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
    let orderlist = [];
    while (numItemsinOrder > 0) {
        const randomProd = faker.random.number({ min: 1, max: Object.keys(prods).length - 1 });
        const quantity = faker.random.number({ min: 1, max: 10 });
        const itemOrderedName = prods[randomProd].name;
        const itemOrderedProduct = prods[randomProd].productID;
        const item = {
            "@type": "Product",
            "name": itemOrderedName,
            "productID": itemOrderedProduct,
            "orderQuantity": quantity
        };
        orderlist.push(item);
        numItemsinOrder -= 1;
    };
    // End ordered products list
    // create seller, broker, customer
    const name1 = faker.company.companyName();
    const lei1 = `2345${faker.random.number({ min: 1000000000000000, max: 1999999999999999 })}`;
    const name2 = faker.company.companyName();
    const lei2 = `5432${faker.random.number({ min: 1000000000000000, max: 1999999999999999 })}`;
    const seller = {
        "@type": "Corporation",
        "name": name1,
        "leiCode": lei1
    };
    const broker = {
        "@type": "Corporation",
        "name": name2,
        "leiCode": lei2
    };
    const person = getPerson();
    delete person['@context'];
    const address = getPostalAddress();
    delete address['@context'];
    delete address['organizationName'];
    const customer = {
        "@type": "Person",
        "name": `${person.firstName} ${person.lastName}`,
        "address": address,
        "telephone": person.phoneNumber,
        "email": person.email
    };

    const orderDate = new Date(faker.date.recent());
    const paymentDate = new Date(faker.date.future());
    const orderNumber = `Order#${faker.random.number({ min: 1, max: 999 })}`;

    const example = {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'EcommerceOrderRegistrationEvidenceDocument',
        "orderNumber": orderNumber,
        "orderDate": orderDate.getMonth() + "-" + orderDate.getDay() + "-" + orderDate.getFullYear(),
        "orderStatus": orderStatus,
        "description": `New Order For ${person.firstName} ${person.lastName}`,
        "url": `${faker.internet.url()}\?queryid=${orderNumber}`,
        "seller": seller,
        "broker": broker,
        "customer": customer,
        "paymentDueDate": paymentDate.getMonth() + "-" + paymentDate.getDay() + "-" + paymentDate.getFullYear(),
        "paymentMethod": paymentMethod,
        "orderedItem": orderlist
    };
    return example;
};

module.exports = { getEcommerceOrderRegistrationEvidenceDocument };