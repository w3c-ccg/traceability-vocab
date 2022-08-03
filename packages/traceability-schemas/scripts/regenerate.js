const fs = require('fs');

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

  console.log(`--- ${filename} ---`);
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
  const path = '../../../docs/openapi/components/schemas/credentials';
  const files = fs.readdirSync(path);

  await Promise.all(
    files.map(async (filename) => {
      const file = fs.readFileSync(`${path}/${filename}`, 'utf-8');
      const start = file.indexOf('  {');
      const jsonStr = file.substring(start);
      const example = JSON.parse(jsonStr);

      if (example.proof) {
        const verified = await checkVerififcation(example, filename);
        if (verified) {
          return;
        }
      }

      const vc = await issueCredential(jsonStr, filename);
      const yml = file.substring(0, start);
      console.log(vc);
      const lines = JSON.stringify(vc, null, 2)
        .split('\n')
        .map((line) => `  ${line}`)
        .join('\n');
      const updatedFile = `${yml}${lines}`;
      console.log(updatedFile);
      fs.writeFileSync(`${path}/${filename}`, updatedFile);
    })
  );
};

main();
