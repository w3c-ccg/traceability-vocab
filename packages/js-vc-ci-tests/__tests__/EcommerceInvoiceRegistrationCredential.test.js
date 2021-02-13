const fs = require('fs');
const path = require('path');
const issuer = require('../services/issuer');
const faker = require('faker');
const prods = require('../../test-vectors/data/generated/EcomProducts.json');
const orders = require('../../test-vectors/data/generated/orderVCIDs.json');

const invoiceNumber = `Invoice#${faker.random.number({ min: 1, max: 999 })}`;

//create a list of orderes for products in invoice
let numOrdersinInvoice = faker.random.number({ min: 1, max: Object.keys(orders).length - 1 });
let orderlist = [];
while (numOrdersinInvoice > 0) {
    const itemOrder = orders.order[numOrdersinInvoice];
    orderlist.push(itemOrder);
    numOrdersinInvoice -= 1;
};

//create a list of ordered products
let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
let productlist = [];
while (numItemsinOrder > 0) {
    const randomProd = faker.random.number({ min: 1, max: Object.keys(prods).length - 1 });
    const itemOrderedProduct = prods[randomProd].productID;
    productlist.push(itemOrderedProduct);
    numItemsinOrder -= 1;
};

it('can issue / verify Ecommerce Invoice Registration', async () => {
    const { verified, verifiableCredential } = await issuer.issue({
        credentialSubject: {
            id: 'did:web:www.acme.com',
            type: 'EcommerceInvoiceRegistrationCredential',
            invoiceID: invoiceNumber,
            orderID: orderlist,
            productInOrder: productlist,
            certificateName: 'ACME Ecommerce Invoice Registration Credential'
        },
    }, [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/traceability/v1',
    ]);
    expect(verified).toBe(true);
    fs.writeFileSync(path.resolve(__dirname, '../../../docs/credentials/EcommerceInvoiceRegistrationCredential.json'), JSON.stringify(verifiableCredential, null, 2));
});