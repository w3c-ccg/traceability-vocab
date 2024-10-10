// https://github.com/digitalbazaar/jsonld.js/issues/516#issuecomment-1485959372
const { kyPromise } = require('@digitalbazaar/http-client')
const { canonize } = require('jsonld')

beforeAll(async () => {
  // https://github.com/digitalbazaar/jsonld.js/issues/516#issuecomment-1485959372
  await kyPromise
})

it('canonize', async () => {
  const data = await canonize(
    {
      '@context': [
        'https://www.w3.org/ns/credentials/v2',
        {
          '@vocab': 'https://w3id.org/traceability#',
          TraceablePresentation: {
            '@id': 'https://w3id.org/traceability#TraceablePresentation',
            '@context': {
              '@vocab': 'https://w3id.org/traceability#',
            },
          },
        },
      ],
      id: 'urn:uuid:00000000-8596-4c3a-a978-8fcaba3903c5',
      type: ['VerifiablePresentation', 'TraceablePresentation'],
      workflow: {
        definition: ['urn:uuid:11111111-cc91-4bb3-91f1-5466a0be084e'],
        instance: ['urn:uuid:22222222-b0b1-41b8-89b0-331ni58b7ee0'],
      },
      holder: {
        id: 'did:web:sender.example',
        type: 'Organization',
      },
    },
    {
      format: 'application/n-quads',
    }
  )
  expect(data)
    .toBe(`<did:web:sender.example> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://w3id.org/traceability#Organization> .
<urn:uuid:00000000-8596-4c3a-a978-8fcaba3903c5> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://w3id.org/traceability#TraceablePresentation> .
<urn:uuid:00000000-8596-4c3a-a978-8fcaba3903c5> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://www.w3.org/2018/credentials#VerifiablePresentation> .
<urn:uuid:00000000-8596-4c3a-a978-8fcaba3903c5> <https://w3id.org/traceability#workflow> _:c14n0 .
<urn:uuid:00000000-8596-4c3a-a978-8fcaba3903c5> <https://www.w3.org/2018/credentials#holder> <did:web:sender.example> .
_:c14n0 <https://w3id.org/traceability#definition> "urn:uuid:11111111-cc91-4bb3-91f1-5466a0be084e" .
_:c14n0 <https://w3id.org/traceability#instance> "urn:uuid:22222222-b0b1-41b8-89b0-331ni58b7ee0" .
`)
})
