const fs = require('fs-extra');
const { Ed25519KeyPair } = require('@transmute/did-key-ed25519');
const { Ed25519Signature2018 } = require('@transmute/ed25519-signature-2018');
const vcjs = require('@transmute/vc.js');
const { system } = require('faker');
const { documentLoader } = require('../src/data/vc/documentLoader');
const config = require('../src/generators/config');

console.log('Initializing credential builder');
// get the good example we just wrote
console.log('Generating credential request objects');
Object.keys(schemas).forEach((schemaName) => {
    if (process.env.VERBOSE_BUILD) {
        console.log('Generating credentials for:', schemaName);
    }
    const schema = schemas[schemaName];
    const exampleFile = path.resolve(__dirname, `../src/__fixtures__/${schemaName}/vc_request.json`);
    if (!fs.existsSync(exampleFile)) {
        console.warn(`No good example for ${schemaName} to generate credential from`);
    } else {
        try {
            if (process.env.VERBOSE_BUILD) {
                console.log('Generating credential for:', schemaName);
            }
            const credTemplate = JSON.parse(
                fs.readFileSync(
                    exampleFile,
                ),
            );

            const key = Ed25519KeyPair.from(require('../src/data/vc/keypair.json'));

            const verifiableCredential = await vcjs.ld.issue({
                credential: credTemplate,
                suite: new Ed25519Signature2018({
                    key,
                }),
                documentLoader,
            });
            const result = await vcjs.ld.verifyCredential({
                credential: verifiableCredential,
                suite: new Ed25519Signature2018(),
                documentLoader,
            });
            // console.log(result)
            expect(result.verified).toBe(true);
            const vcFile = path.resolve(__dirname, `../src/__fixtures__/${schemaName}/vc.json`);
            console.log('Writing credential example to:', vcFile);
            fs.outputFileSync(
                vcFile,
                JSON.stringify(verifiableCredential, null, 2),
            );

        } catch (credentialError) {
            console.warn('Could not issue Credential:', schemaName, '\n', credentialError);
            if (process.env.FULL_ERROR_HANDLING) {
                process.exit(1);
            }
        }
    }
});
