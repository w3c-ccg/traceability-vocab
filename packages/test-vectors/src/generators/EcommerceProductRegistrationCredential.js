const faker = require('faker');

const getEcommerceProductRegistrationCredential = () => {

    let ProductCodeType = 'GTIN';
    if (faker.random.number({ min: 1, max: 2 }) === 1) {
        ProductCodeType = 'UPC';
    }

    const example = {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'EcommerceProductRegistrationCredential',
        productCode: faker.random.number(14),
        productCodeType: ProductCodeType,
        certificateName: 'ACME Ecommerce Product Registration Certificate',
    };

    return example;
};

module.exports = { getEcommerceProductRegistrationCredential };