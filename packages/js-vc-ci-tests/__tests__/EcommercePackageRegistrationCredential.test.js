const fs = require('fs');
const path = require('path');
const issuer = require('../services/issuer');
const faker = require('faker');
const prods = require('../../test-vectors/data/generated/EcomProducts.json');
const orders = require('../../test-vectors/data/generated/orderVCIDs.json');

//create a list of orderes for products in package
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
        "productReceiptID": `https://example.VC_url.com/?queryID=${faker.random.hexaDecimal(64)}`,
        "packingListID": `https://example.VC_url.com/?queryID=${faker.random.hexaDecimal(64)}`,
        "orderNumber": itemOrder,
        "productInOrder": productlist
    };
    packagelist.push(item);
    numOrdersinPackage -= 1;
};

it('can issue / verify Ecommerce Package Registration', async () => {
    const { verified, verifiableCredential } = await issuer.issue({
        credentialSubject: {
            id: 'did:web:www.fedex.com',
            type: 'EcommercePackageRegistrationCredential',
            trackingID: `${faker.random.number({ min: 100000000000, max: 999999999999 })}`,
            packageItems: packagelist,
            certificateName: 'Fedex Ecommerce Package Registration Credential'
        },
    }, [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/traceability/v1',
        { "productReceiptID": "https://w3id.org/traceability/EcommerceProductReceiptRegistrationCredential#receiptID" },
        { "packingListID": "https://schema.org/identifier" },
        { "orderNumber": "https://schema.org/orderNumber" },
        { "productInOrder": "https://schema.orgproductID" }
    ]);
    expect(verified).toBe(true);
    fs.writeFileSync(path.resolve(__dirname, '../../../docs/credentials/EcommercePackageRegistrationCredential.json'), JSON.stringify(verifiableCredential, null, 2));
});