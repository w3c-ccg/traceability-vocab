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

  'https://w3id.org/traceability/v1': JSON.parse(
    fs
      .readFileSync(
        path.resolve(__dirname, '../../../docs/contexts/traceability-v1.jsonld')
      )
      .toString()
  ),
};

module.exports = { contexts };
