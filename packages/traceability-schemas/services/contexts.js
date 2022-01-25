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

  'https://w3id.org/traceability/v1': JSON.parse(
    fs
      .readFileSync(
        path.resolve(__dirname, '../../../docs/contexts/traceability-v1.jsonld')
      )
      .toString()
  ),
};

module.exports = { contexts };
