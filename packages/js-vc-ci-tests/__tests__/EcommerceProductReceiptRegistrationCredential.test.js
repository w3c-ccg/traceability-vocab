const fs = require('fs');
const path = require('path');
const issuer = require('../services/issuer');
const faker = require('faker');
const prods = require('../../test-vectors/data/generated/EcomProducts.json');
const orders = require('../../test-vectors/data/generated/orderVCIDs.json');

const receiptNumber = `Receipt#${faker.random.number({ min: 1, max: 999 })}`;

//create a list of packing list for products that have been received by shipper/carrier
let numPLSinReceipt = faker.random.number({ min: 1, max: Object.keys(orders).length });
let plslist = [];
while (numPLSinReceipt > 0) {
    const itemPLS = orders.order[numPLSinReceipt - 1];
    plslist.push(itemPLS);
    numPLSinReceipt -= 1;
};

//create a list of orders for products that have been received by shipper/carrier
let numOrdersinReceipt = faker.random.number({ min: 1, max: Object.keys(orders).length });
let orderlist = [];
while (numOrdersinReceipt > 0) {
    const itemOrder = orders.order[numOrdersinReceipt - 1];
    orderlist.push(itemOrder);
    numOrdersinReceipt -= 1;
};

//create a list of ordered products
let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
let productlist = [];
while (numItemsinOrder > 0) {
    const randomProd = faker.random.number({ min: 0, max: Object.keys(prods).length - 1 });
    const itemOrderedProduct = prods[randomProd].productID;
    productlist.push(itemOrderedProduct);
    numItemsinOrder -= 1;
};

it('can issue / verify Ecommerce Product Receipt Registration', async () => {
    const { verified, verifiableCredential } = await issuer.issue({
        credentialSubject: {
            id: 'did:web:www.fedex.com',
            type: 'EcommerceProductReceiptRegistrationCredential',
            receiptID: receiptNumber,
            packingListID: plslist,
            orderID: orderlist,
            productInOrder: productlist,
            certificateName: 'FedEx Ecommerce Product Receipt Registration Certificate',
        },
    }, [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/traceability/v1',
    ]);
    expect(verified).toBe(true);
    fs.writeFileSync(path.resolve(__dirname, '../../../docs/credentials/EcommerceProductReceiptRegistrationCredential.json'), JSON.stringify(verifiableCredential, null, 2));
});