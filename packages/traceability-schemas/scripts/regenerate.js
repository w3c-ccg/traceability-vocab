/* eslint-disable no-await-in-loop */

const fs = require('fs');
const { resolve } = require('path');

const transmute = require('@transmute/vc.js');
const {
  Ed25519Signature2018,
  Ed25519VerificationKey2018,
} = require('@transmute/ed25519-signature-2018');
const documentLoader = require('../services/documentLoader');
const keyPair = require('../services/keyPair.json');

const checkVerififcation = async (verifiableCredential, filename) => {
  const { verified } = await transmute.verifiable.credential.verify({
    credential: verifiableCredential,
    format: ['vc'],
    documentLoader,
    suite: [new Ed25519Signature2018()],
    // Ignore revocation lists...
    checkStatus: () => ({ verified: true }),
  });
  return verified;
};

const issueCredential = async (candidate, filename) => {
  const credential = JSON.parse(candidate);
  delete credential.proof;

  if (credential.issuer && credential.issuer.id) {
    credential.issuer.id = keyPair.controller;
  } else {
    credential.issuer = keyPair.controller;
  }

  console.log(`Sign: ${filename}`);
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

  const { verified } = await transmute.verifiable.credential.verify({
    credential: verifiableCredential,
    format: ['vc'],
    documentLoader,
    suite: [new Ed25519Signature2018()],
    // Ignore revocation lists...
    checkStatus: () => ({ verified: true }),
  });

  if (!verified) {
    throw new Error('Could not verify credential immediately after signing it');
  }

  return verifiableCredential;
};

const main = async () => {
  const path = resolve(
    __dirname,
    '../../../docs/openapi/components/schemas/credentials'
  );

  if (!fs.existsSync(path)) {
    throw new Error('Cannot find credentials directory');
  }

  const files = fs.readdirSync(path);

  for (let i = 0; i < files.length; i += 1) {
    const filename = files[i];
    const file = fs.readFileSync(`${path}/${filename}`, 'utf-8');
    const start = file.indexOf('  {');
    const jsonStr = file.substring(start);
    let example
    try {
      example = JSON.parse(jsonStr);
    } catch(err) {
      console.log("ERROR IN", filename)
      console.log(jsonStr)
      throw err;
    }

    if (example.proof) {
      const verified = await checkVerififcation(example, filename);
      if (verified) {
        // eslint-disable-next-line no-continue
        continue;
      }
    }

    const vc = await issueCredential(jsonStr, filename);
    const yml = file.substring(0, start);
    const lines = JSON.stringify(vc, null, 2)
      .split('\n')
      .map((line) => `  ${line}`)
      .join('\n');
    const updatedFile = `${yml}${lines}`;
    fs.writeFileSync(`${path}/${filename}`, updatedFile);
  }
};

console.log('🧪 resign credentials as needed');
main();
