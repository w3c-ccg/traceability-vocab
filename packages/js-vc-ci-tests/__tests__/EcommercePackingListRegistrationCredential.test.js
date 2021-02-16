const fs = require('fs');
const path = require('path');
const issuer = require('../services/issuer');
const faker = require('faker');
const prods = require('../../test-vectors/data/generated/EcomProducts.json');
const orders = require('../../test-vectors/data/generated/orderVCIDs.json');

//create a list of orderes for products in invoice
let numOrdersinPackage = faker.random.number({ min: 1, max: Object.keys(orders).length });
let packagelist = [];
while (numOrdersinPackage > 0) {
    let itemOrder = orders.order[numOrdersinPackage];
    //create a list of ordered products
    let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
    let productlist = [];
    while (numItemsinOrder > 0) {
        let randomProd = faker.random.number({ min: 0, max: Object.keys(prods).length - 1 });
        let itemOrderedProduct = prods[randomProd].productID;
        productlist.push(itemOrderedProduct);
        numItemsinOrder -= 1;
    };
    let item = {
        orderNumber: itemOrder,
        productInOrder: productlist
    };
    packagelist.push(item);
    numOrdersinPackage -= 1;
};

it('can issue / verify Ecommerce Packing List Registration', async () => {
    const { verified, verifiableCredential } = await issuer.issue({
        credentialSubject: {
            id: 'did:web:www.acme.com',
            type: 'EcommercePackingListRegistrationCredential',
            packageItems: packagelist,
            certificateName: 'ACME Ecommerce Packing List Registration Credential'
        },
    }, [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/traceability/v1'
    ]);
    expect(verified).toBe(true);
    fs.writeFileSync(path.resolve(__dirname, '../../../docs/credentials/EcommercePackingListRegistrationCredential.json'), JSON.stringify(verifiableCredential, null, 2));
});