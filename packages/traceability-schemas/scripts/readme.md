# Scripts

This directory contains a number of scripts for running tasks associated with
traceability-vocabulary.

### Table of Contents

1. create-future-vc.js
2. openapi-to-context.js
3. regenerate.js
4. schemas-to-openapi.js
5. schemas-to-vocab.js

## create-future-vc.js

This script is used to sign a new credential to be added into the `credentials` directory. For schemas
that are defined as a Veriable Credential with an `issuer`, `credentialSubject` and `proof`.

**Note:** This script has been effectively replaced with `regenerate.js`

## openapi-to-context.js

Used to generate the `/docs/contexts/traceability-v1.jsonld` file when running `npm run build`. 

## regenerate.js

This is a utility script which is used to re-sign broken proofs when changes to context cause the proof to
fail. This can be executed by running the following two commands from the root of this repository.

```
cd ./packages/traceability-schemas/scripts/
node regenerate.js
```

## schemas-to-openapi.js

This script is used to generate the `/docs/openapi/openapi.yml` file when running `npm run build`. 

## schemas-to-vocab.js

This script is for generating the html-redoc document which is published here: https://w3c-ccg.github.io/traceability-vocab/