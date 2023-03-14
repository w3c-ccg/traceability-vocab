const fs = require('fs');
const path = require('path');
const cred = require('@transmute/credentials-context');
const did = require('@transmute/did-context');
const sec = require('@transmute/security-context');

const contexts = {
  'https://www.w3.org/2018/credentials/v1': cred.contexts.get(
    'https://www.w3.org/2018/credentials/v1'
  ),
  'https://www.w3.org/ns/did/v1': did.contexts.get(
    'https://www.w3.org/ns/did/v1'
  ),
  'https://w3id.org/security/suites/jws-2020/v1': sec.contexts.get(
    'https://w3id.org/security/suites/jws-2020/v1'
  ),
  'https://w3id.org/security/suites/ed25519-2018/v1': sec.contexts.get(
    'https://w3id.org/security/suites/ed25519-2018/v1'
  ),
  'https://w3id.org/security/suites/x25519-2019/v1': sec.contexts.get(
    'https://w3id.org/security/suites/x25519-2019/v1'
  ),
  'https://w3id.org/vc/status-list/2021/v1': {
    '@context': {
      '@protected': true,

      StatusList2021Credential: {
        '@id': 'https://w3id.org/vc/status-list#StatusList2021Credential',
        '@context': {
          '@protected': true,

          id: '@id',
          type: '@type',

          description: 'http://schema.org/description',
          name: 'http://schema.org/name',
        },
      },

      StatusList2021: {
        '@id': 'https://w3id.org/vc/status-list#StatusList2021',
        '@context': {
          '@protected': true,

          id: '@id',
          type: '@type',

          statusPurpose: 'https://w3id.org/vc/status-list#statusPurpose',
          encodedList: 'https://w3id.org/vc/status-list#encodedList',
        },
      },

      StatusList2021Entry: {
        '@id': 'https://w3id.org/vc/status-list#StatusList2021Entry',
        '@context': {
          '@protected': true,

          id: '@id',
          type: '@type',

          statusPurpose: 'https://w3id.org/vc/status-list#statusPurpose',
          statusListIndex: 'https://w3id.org/vc/status-list#statusListIndex',
          statusListCredential: {
            '@id': 'https://w3id.org/vc/status-list#statusListCredential',
            '@type': '@id',
          },
        },
      },
    },
  },
  'https://ref.gs1.org/gs1/vc/licence-context/': {
    '@context': {
      '@version': 1.1,
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      owl: 'http://www.w3.org/2002/07/owl#',
      skos: 'http://www.w3.org/2004/02/skos/core#',
      gs1: 'https://gs1.org/voc/',
      language: '@language',
      value: '@value',
      GS1PrefixLicenceCredential: {
        '@id': 'gs1:GS1PrefixLicenceCredential',
      },
      GS18PrefixLicenceCredential: {
        '@id': 'gs1:GS18PrefixLicenceCredential',
      },
      GS1CompanyPrefixLicenceCredential: {
        '@id': 'gs1:GS1CompanyPrefixLicenceCredential',
      },
      GS1IdentificationKeyLicenceCredential: {
        '@id': 'gs1:GS1IdentificationKeyLicenceCredential',
      },
      GS1DelegatedPrefixLicenceCredential: {
        '@id': 'gs1:GS1DelegatedPrefixLicenceCredential',
      },
      GS1DelegatedIdentificationKeyLicenceCredential: {
        '@id': 'gs1:GS1DelegatedIdentificationKeyLicenceCredential',
      },
      partyGLN: {
        '@id': 'gs1:partyGLN',
      },
      organizationName: {
        '@id': 'gs1:organizationName',
      },
      extendsCredential: {
        '@id': 'gs1:extendsCredential',
        '@type': '@id',
      },
      licenceValue: {
        '@id': 'gs1:licenceValue',
      },
      alternativeLicenceValue: {
        '@id': 'gs1:alternativeLicenceValue',
      },
      identificationKeyType: {
        '@id': 'gs1:identificationKeyType',
      },
      isGS1CompanyPrefixLicenceAllowed: {
        '@id': 'gs1:isGS1CompanyPrefixLicenceAllowed',
      },
      isExactMatchRequired: {
        '@id': 'gs1:isExactMatchRequired',
      },
      isGS1IdentificationKeyLicenceAllowed: {
        '@id': 'gs1:isGS1IdentificationKeyLicenceAllowed',
      },
    },
  },
  'https://ref.gs1.org/gs1/vc/declaration-context/': {
    '@context': {
      '@version': 1.1,
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      owl: 'http://www.w3.org/2002/07/owl#',
      skos: 'http://www.w3.org/2004/02/skos/core#',
      gs1: 'https://gs1.org/voc/',
      language: '@language',
      value: '@value',
      GS1KeyCredential: {
        '@id': 'gs1:GS1KeyCredential',
      },
      GS1DataCredential: {
        '@id': 'gs1:GS1DataCredential',
      },
      GS1DelegationCredential: {
        '@id': 'gs1:GS1DelegationCredential',
      },
      sameAs: {
        '@id': 'gs1:sameAs',
      },
      keyAuthorization: {
        '@id': 'gs1:keyAuthorization',
      },
      dataCertification: {
        '@id': 'gs1:dataCertification',
      },
      delegation: {
        '@id': 'gs1:delegation',
      },
      dataCredentialType: {
        '@id': 'gs1:dataCredentialType',
      },
    },
  },
  'https://ref.gs1.org/gs1/vc/trade-item-context/': {
    '@context': {
      '@version': 1.1,
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      owl: 'http://www.w3.org/2002/07/owl#',
      skos: 'http://www.w3.org/2004/02/skos/core#',
      gs1: 'https://gs1.org/voc/',
      language: '@language',
      value: '@value',
      GS1VerifiedByGS1TradeItemDataCredential: {
        '@id': 'gs1:GS1VerifiedByGS1TradeItemDataCredential',
      },
      brandOwner: {
        '@id': 'gs1:brandOwner',
      },
      tradeItemDescription: {
        '@id': 'gs1:tradeItemDescription',
      },
      tradeItemImageURL: {
        '@id': 'gs1:tradeItemImageURL',
      },
      gpcCode: {
        '@id': 'gs1:gpcCode',
      },
      netContent: {
        '@id': 'gs1:netContent',
      },
      netContentUOM: {
        '@id': 'gs1:netContentUOM',
      },
      targetMarketCountryCode: {
        '@id': 'gs1:targetMarketCountryCode',
      },
    },
  },
  'https://w3id.org/traceability/v1': JSON.parse(
    fs
      .readFileSync(
        path.resolve(__dirname, '../../../docs/contexts/traceability-v1.jsonld')
      )
      .toString()
  ),
};

module.exports = { contexts };
