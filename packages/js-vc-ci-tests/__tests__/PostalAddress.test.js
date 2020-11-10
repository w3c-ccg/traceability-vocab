const fs = require('fs');
const path = require('path');
const issuer = require('../services/issuer');

it('can issue / verify PostalAddress', async () => {
  const { verified, verifiableCredential } = await issuer.issue({
    credentialSubject: {
      id: 'did:example:123',
      type: 'Place',
      address: {
        type: 'PostalAddress',
        organizationName: 'Bednar - Kutch',
        streetAddress: '8440 Khalid Canyon',
        addressLocality: 'Gislasonland',
        addressRegion: 'Ohio',
        postalCode: '96546',
        addressCountry: 'Liechtenstein',
      },
    },
  }, [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/traceability/v1',
  ]);
  expect(verified).toBe(true);
  fs.writeFileSync(path.resolve(__dirname, '../../../docs/credentials/Place.json'), JSON.stringify(verifiableCredential, null, 2));
});
