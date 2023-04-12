// https://github.com/digitalbazaar/jsonld.js/issues/516#issuecomment-1485959372
const { kyPromise } = require('@digitalbazaar/http-client');
const { canonize } = require('jsonld');

beforeAll(async () => {
  // https://github.com/digitalbazaar/jsonld.js/issues/516#issuecomment-1485959372
  await kyPromise;
});

it('canonize', async () => {
  expect(
    await canonize(
      {
        '@context': { '@vocab': 'https://www.w3.org/2018/credentials#' },
        type: ['VerifiableCredential'],
        issuer: 'https://example.edu/issuers/565049',
        issuanceDate: '2010-01-01T19:23:24Z',
        credentialSubject: {
          id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
        },
      },
      {
        format: 'application/n-quads',
      }
    )
  )
    .toBe(`_:c14n0 <https://www.w3.org/2018/credentials#id> "did:example:ebfeb1f712ebc6f1c276e12ec21" .
_:c14n1 <https://www.w3.org/2018/credentials#credentialSubject> _:c14n0 .
_:c14n1 <https://www.w3.org/2018/credentials#issuanceDate> "2010-01-01T19:23:24Z" .
_:c14n1 <https://www.w3.org/2018/credentials#issuer> "https://example.edu/issuers/565049" .
_:c14n1 <https://www.w3.org/2018/credentials#type> "VerifiableCredential" .
`);
});
