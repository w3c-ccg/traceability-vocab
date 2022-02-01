This directory is reserved for testing credentials that will only work with:

##### LOCAL JSON-LD `@context` changes.

Without this directory and the associated tooling scripts, authors would need to publish examples in a 2 step process, as seen [here](https://github.com/w3c-ccg/traceability-vocab/pull/262).

## Usage

```
npm run create:future:vc:example ./data/credential.json
```

This will result in a new file `./data/credential.verifiable.json`

This file will contain a linked data proof which was generated over the LOCAL JSON-LD Context.

This credential will not verify remotely until the remote context is published:

```
./docs/contexts/traceability-v1.jsonld -> after publish -> https://w3id.org/traceability/v1
```

These files can be added to Schemas as examples because the CI system uses the local context to verify them.
