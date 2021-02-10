const fs = require('fs');
const path = require('path');
const issuer = require('../services/issuer');
const faker = require('faker');
const identifiers = require('../../test-vectors/data/generated/orderVCIDs.json');

let Randnum = faker.random.number({ min: 1, max: 3 });

if (Randnum === 1) {
    ProductCodeType = 'UPC';
    itemVCID = identifiers.order[0];
    certname = 'Amazon Ecommerce Universal Product Code Product Registration Certificate';
};
if (Randnum === 2) {
    ProductCodeType = 'CO';
    itemVCID = identifiers.order[1];
    certname = 'Amazon Ecommerce Country of Origin Code Product Registration Certificate';
};
if (Randnum === 3) {
    ProductCodeType = 'HTS';
    itemVCID = identifiers.order[0];
    certname = 'Amazon Ecommerce HTS Code Product Registration Certificate';
};

it('can issue / verify Ecommerce Additional Product Code Registration', async () => {
    const { verified, verifiableCredential } = await issuer.issue({
        credentialSubject: {
            id: 'did:web:www.amazon.com',
            type: 'EcommerceAdditionalProductCodeRegistrationCredential',
            productVCid: itemVCID,
            addProductCode: faker.random.number(14),
            addProductCodeType: ProductCodeType,
            certificateName: certname,
        },
    }, [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/traceability/v1',
    ]);
    expect(verified).toBe(true);
    fs.writeFileSync(path.resolve(__dirname, '../../../docs/credentials/EcommerceAdditionalProductCodeRegistrationCredential.json'), JSON.stringify(verifiableCredential, null, 2));
});