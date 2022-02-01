const fs = require('fs');
const path = require('path');

const transmute = require('@transmute/vc.js');
const {
  Ed25519Signature2018,
  Ed25519VerificationKey2018,
} = require('@transmute/ed25519-signature-2018');
const documentLoader = require('../services/documentLoader');
const keyPair = require('../services/keyPair.json');

console.log(`

Creating a Verifiable Credential with the latest local traceability context:

./docs/contexts/traceability-v1.jsonld -> after publish -> https://w3id.org/traceability/v1

🔥 WARNING: this credential won't be (externally / independantly) verifiable until after the context above has been published to the web.

🔥 WARNING: IF the credential updated was previously verified using a cache AND the cache is now stale, 

Every cached context will need to be updated to include the latest context changes. 

`);

let credential;

const relativeCredentialPath = process.argv[process.argv.length - 1];
const absoluteCredentialPath = path.resolve(
  process.cwd(),
  relativeCredentialPath
);

try {
  credential = JSON.parse(fs.readFileSync(absoluteCredentialPath).toString());
} catch (e) {
  console.error(
    '❌ The credential path provided is not correct or contains invalid json.\n'
  );
  process.exit(1);
}

(async () => {
  if (credential.issuer.id) {
    credential.issuer.id = keyPair.controller;
  } else {
    credential.issuer = keyPair.controller;
  }

  const {
    items: [verifiableCredential],
  } = await transmute.verifiable.credential.create({
    credential,
    format: ['vc'],
    documentLoader,
    suite: new Ed25519Signature2018({
      key: await Ed25519VerificationKey2018.from(keyPair),
    }),
  });
  fs.writeFileSync(
    absoluteCredentialPath.replace('.json', '.verifiable.json'),
    JSON.stringify(verifiableCredential, null, 2)
  );

  console.error(
    '✅ was issued successful.\n\n',
    JSON.stringify(verifiableCredential, null, 2)
  );

  const { verified } = await transmute.verifiable.credential.verify({
    credential: verifiableCredential,
    format: ['vc'],
    documentLoader,
    suite: [new Ed25519Signature2018()],
    // Ignore revocation lists...
    checkStatus: () => ({ verified: true }),
  });

  console.error(
    `\n${verified ? '✅ ' : '❌ '} the Verifiable Credential was verified ${
      verified ? 'successfully' : 'unsuccessfully '
    }.\n`
  );
})();
