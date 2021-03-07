const credentialsContexts = require('@transmute/credentials-context');
const securityContexts = require('@transmute/security-context');
const didContexts = require('@transmute/did-context');

const fs = require('fs');
const path = require('path');

const documentLoader = (iri) => {
    if (didContexts.contexts.has(iri)) {
        return {
            documentUrl: iri,
            document: didContexts.contexts.get(iri)
        };
    }
    if (credentialsContexts.contexts.has(iri)) {
        return {
            documentUrl: iri,
            document: credentialsContexts.contexts.get(iri)
        };
    }
    if (securityContexts.contexts.has(iri)) {
        return {
            documentUrl: iri,
            document: securityContexts.contexts.get(iri)
        };
    }
    if (iri.startsWith('https://w3id.org/traceability/v1')) {
        return {
            documentUrl: iri,
            document: JSON.parse(fs.readFileSync(
                path.resolve(__dirname, '../../../../../docs/contexts/traceability-v1.jsonld')
            ).toString())
        };
    }
    if (iri.startsWith('did:example')) {
        return {
            documentUrl: iri,
            document: require('./didDocument.json')
        };
    }
    console.error(`unsupported iri ${iri}`);
    throw new Error(`unsupported iri ${iri}`);
};

module.exports = { documentLoader };
