const faker = require('faker');
//Include test data for ecom products.
const prods = require('../../data/generated/EcomProducts.json');
const orders = require('../../data/generated/orderVCIDs.json');

const getEcommercePackingListRegistrationCredential = () => {

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
            "orderNumber": itemOrder,
            "productInOrder": productlist
        };
        packagelist.push(item);
        numOrdersinPackage -= 1;
    };


    const example = {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'EcommercePackingListRegistrationCredential',
        packageItems: packagelist,
        certificateName: 'ACME Ecommerce Packing List Registration Certificate',
    };

    return example;
};

module.exports = { getEcommercePackingListRegistrationCredential };