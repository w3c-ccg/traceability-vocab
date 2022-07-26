# Scripts

This directory contains a number of scripts for running tasks associated with
traceability-vocabulary.

### Table of Contents

1. openapi-to-context.js
2. regenerate.js
3. schemas-to-openapi.js
4. schemas-to-vocab.js

## openapi-to-context.js

This script is used to generate the `/docs/contexts/traceability-v1.jsonld` file when running `npm run build`.

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
