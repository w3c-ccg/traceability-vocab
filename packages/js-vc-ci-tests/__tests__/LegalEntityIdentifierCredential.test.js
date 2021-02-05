const fs = require('fs');
const path = require('path');
const issuer = require('../services/issuer');
const faker = require('faker');

it('can issue / verify LegalEntityIdentfier', async () => {
    const { verified, verifiableCredential } = await issuer.issue({
        credentialSubject: {
            id: 'did:web:www.amazon.com',
            type: 'LegalEntityIdentifierCredential',
            leiCode: faker.random.alphaNumeric(20).toUpperCase(),
            certificateName: 'US Legal Entity Certificate'
        },
    }, [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/traceability/v1',
    ]);
    expect(verified).toBe(true);
    fs.writeFileSync(path.resolve(__dirname, '../../../docs/credentials/LegalEntityIdentifierCredential.json'), JSON.stringify(verifiableCredential, null, 2));
});
