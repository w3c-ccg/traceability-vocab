const context = require('jsonld/lib/context');
const jsonldLib = require('jsonld/lib');

const ctxIri = 'https://w3id.org/traceability/v1';
const ctxName = 'traceability-v1.jsonld';

describe('Loading generated json-ld context(s)', () => {
    it(`${ctxName} should load as a valid context, and fail when structurally mucked up`, async () => {
        // the doc loader grabs the generated json-ld
        const { documentLoader } = require('../data/vc/documentLoader');

        // console.log('***** DUMP BIG OLD STUFF\n', documentLoader(ctxIri).document);

        await expect(async () => {
            const ctx = await jsonldLib.processContext(
                context.getInitialContext({}),
                documentLoader(ctxIri).document,
                {
                    documentLoader
                }
            );
        }).not.toThrow(jsonldLib.JsonLdError);
        await expect(async () => {
            const doc = documentLoader(ctxIri).document;
            doc['@context']['@version'] = 0.0;
            const ctx = await jsonldLib.processContext(
                context.getInitialContext({}),
                doc,
                {
                    documentLoader
                }
            );
        }).rejects.toThrow(jsonldLib.UnsupportedVersion);
    });
});
