const { getOrganization } = require('./Organization');

const getVerifiableBusinessCard = () => {
  const manufacturer = getOrganization();
  delete manufacturer['@context'];
  const example = {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://w3id.org/traceability/v1',
    ],
    id: 'https://example.com/credential/123456',
    type: ['VerifiableCredential', 'VerifiableBusinessCard'],
    name: 'Verifiable Business Card',
    relatedLink: [
      {
        type: 'LinkRole',
        target: 'https://example.com/organizations/example-org/presentations/available',
        linkRelationship: 'OrganizationPresentationEndpoint',
      },
    ],
    issuanceDate: '2019-12-11T03:50:55Z',
    issuer: {
      id: 'did:example:123',
      ...manufacturer,
    },
    credentialSubject: {
      type: ['Organization'],
      name: 'Steel Manufacturer Org',
      url: 'https://www.example.com/'
    }
  };

  return example;
};

module.exports = { getVerifiableBusinessCard };
