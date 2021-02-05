const fs = require('fs');
const path = require('path');
const issuer = require('../services/issuer');
const faker = require('faker');

it('can issue / verify Ecommerce Product Registration', async () => {
    const { verified, verifiableCredential } = await issuer.issue({
        credentialSubject: {
            id: 'did:web:www.amazon.com',
            type: 'EcommerceProductRegistrationCredential',
            productCode: faker.random.number(14),
            productCodeType: 'GTIN',
            certificateName: 'Amazon Ecommerce Product Registration Credential'
        },
    }, [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/traceability/v1',
    ]);
    expect(verified).toBe(true);
    fs.writeFileSync(path.resolve(__dirname, '../../../docs/credentials/EcommerceProductRegistrationCredential.json'), JSON.stringify(verifiableCredential, null, 2));
});
