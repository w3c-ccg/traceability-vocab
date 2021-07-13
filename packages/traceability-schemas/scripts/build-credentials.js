const path = require('path');
const fs = require('fs-extra');
const { Ed25519KeyPair } = require('@transmute/did-key-ed25519');
const { Ed25519Signature2018 } = require('@transmute/ed25519-signature-2018');
const vcjs = require('@transmute/vc.js');
const { documentLoader } = require('../src/data/vc/documentLoader');
const credstatus = require('../src/data/vc/includingcredentialstatus.json');

console.log('🧪 Initializing credential builder');
const schemas = require('../index.js');

const issueCreds = async (credTemplate, schemaName) => {
  try {
    const key = Ed25519KeyPair.from(require('../src/data/vc/keypair.json'));

    // deep copy
    let credentialPayload = JSON.parse(JSON.stringify(credTemplate));
    // allow for custom VC properties....
    // hacky...
    if (
      credentialPayload.credentialSubject.type[0] === 'VerifiableCredential'
    ) {
      credentialPayload = credentialPayload.credentialSubject;
      if (typeof credentialPayload.issuer === 'string') {
        credentialPayload.issuer = key.controller;
      } else {
        credentialPayload.issuer.id = key.controller;
      }
    } else {
      // eslint-disable-next-line
      delete credTemplate.credentialSubject['@context'];
    }

    const verifiableCredential = await vcjs.ld.issue({
      credential: credentialPayload,
      suite: new Ed25519Signature2018({
        key,
        date: '2019-12-11T03:50:55Z',
      }),
      documentLoader,
    });

    // check if VC has credential status
    let loopvar = credstatus.included.length;
    let remove = false;
      while (loopvar > 0) {
        if (credstatus.included[loopvar - 1] === schemaName) {
          remove = true;
        }
        loopvar -= 1;
      }
      let result = {};
    if (!remove) {
      result = await vcjs.ld.verifyCredential({
      credential: verifiableCredential,
      suite: new Ed25519Signature2018(),
      documentLoader,
    });
      } else {
          result = await vcjs.ld.verifyCredential({
          credential: verifiableCredential,
          suite: new Ed25519Signature2018(),
          documentLoader,
          checkStatus: async () => ({ verified: true })
        });
      }
    // console.log(result)
    if (result.verified) {
      const vcFile = path.resolve(
        __dirname,
        `../src/__fixtures__/${schemaName}/vc.json`
      );
      if (process.env.VERBOSE_BUILD) {
        console.log('Writing credential example to:', vcFile);
      }
      fs.outputFileSync(vcFile, JSON.stringify(verifiableCredential, null, 2));
    } else {
      console.log('Error verifying credential for:', schemaName);
    }
  } catch (credentialError) {
    console.warn(
      'Could not issue Credential:',
      schemaName,
      '\n',
      credentialError
    );
    if (process.env.FULL_ERROR_HANDLING) {
      process.exit(1);
    }
  }
};

const credPromises = [];
Object.keys(schemas).forEach((schemaName) => {
  if (process.env.VERBOSE_BUILD) {
    console.log('Generating credentials for:', schemaName);
  }
  const exampleFile = path.resolve(
    __dirname,
    `../src/__fixtures__/${schemaName}/credential.json`
  );
  if (!fs.existsSync(exampleFile)) {
    console.warn(
      `No good example for ${schemaName} to generate credential from`
    );
  } else {
    try {
      if (process.env.VERBOSE_BUILD) {
        console.log('Generating credential for:', schemaName);
      }
      const credTemplate = JSON.parse(fs.readFileSync(exampleFile));
      credPromises.push(issueCreds(credTemplate, schemaName));
    } catch (fileErr) {
      console.log('Error reading credential template for schema:', schemaName);
    }
  }
});

Promise.allSettled(credPromises).then((results) => results.forEach((result) => {
    // noop
    if (process.env.VERBOSE_BUILD) {
      console.log(result.status);
    }
  }));
