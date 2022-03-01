This directory is reserved for testing credentials that will only work with:

##### LOCAL JSON-LD `@context` changes.

Without this directory and the associated tooling scripts, authors would need to publish examples in a 2 step process, as seen [here](https://github.com/w3c-ccg/traceability-vocab/pull/262).
Linking to this issue does not describe how to add context.

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

## Adding Schemas

A linked data term will need to be added to the top of each OpenAPI schema definition, or the CI will fail.
Provided below is an example of the minimum required placeholder for a new schema to be added to the repository.

```
$linkedData:
  term: PurchaseOrder
  '@id': https://w3id.org/traceability#PurchaseOrder
title: PurchaseOrder
type: object
description: A statement issued by a buyer for the sale of products or services to be delivered at a later date
additionalProperties: true
example: |-
  {
    "type": "PurchaseOrder"
  }
```
