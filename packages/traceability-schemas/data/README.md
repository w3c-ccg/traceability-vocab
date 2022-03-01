This directory is reserved for testing credentials that will only work with:

##### LOCAL JSON-LD `@context` changes.

Without this directory and the associated tooling scripts, authors would need to publish examples in a 2 step process,
as described in this document.

## Usage

In order to add a Verifiable Credential schema with a signed JSON example,
you must first run `npm run build` to create a new local JSON-LD context file which is located at
`docs/context/traceability-v1.jsonld` relative to the root of this repository.

From there you should take the example Credential JSON without the proof,
and replace the `credential.json` file in this directory with the Credential you intend to sign.

From there run the following command in this directory.

```
npm run create:future:vc:example ./data/credential.json
```

The signed Credential will be written to this directory as `credential.verifiable.json`.
Open the file and copy the content JSON into the `example:` section of your YML schema
definition. Run `npm run test` from the root of this repository to make sure that the
Verifiable Credential passes verification before commiting and opening a Pull Request.

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
