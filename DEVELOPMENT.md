# Development

1. Getting Started
2. Directory Structure
3. Conventions
4. Continuous Integreation
5. Continuous Deployment
6. Generating Proofs

The purpose of this document is to describe to developers how to navigate this repository
in order to make meaningful contributions to this product.

## Getting Started

To get started building, testing, or contributing to this repository, you will need [Node.js](https://nodejs.org) and [git](https://git-scm.com/).

```
git clone https://github.com/w3c-ccg/traceability-vocab.git
cd traceability-vocab
npm i
```

To run a local version of the [spec](https://w3c-ccg.github.io/traceability-vocab/) you can run:

```
npx serve ./docs
```

## Directory Structure

The primary focus of this repository is to define schemas which describe Verifiable Credentials which act as a digitally
equivalent signed form of a document. These credentials can be found in the `/docs/openapi/components/schemas/credentials/`
directory, starting from the root of this repository.

To enable standard re-usable parts for defining RDF classes in credentials, we have a `common` folder located at
`/docs/openapi/components/schemas/common/` in which we store these classes. As a comparison to React, think of `credentials` as
top-level pages, and think of `common` as the components that make up these pages.

Presentations are a way to exchange credentials between parties. Presentations can have a specific schema or structure
that defines a specific workflow. One such workflow definition would be a workflow for importing steel. Presentation
definitions can be found in the `/docs/openapi/components/schemas/presentations/` directory.

When the `npm i` command is run, it will generate the JSON-LD context from the schemas. This context is found at
`/docs/contexts/traceability-v1.jsonld` from the root of this repository.

There are several scripts in this repository for compiling trace vocabulary. These scripts can be found in the
`/packages/traceability-schemas/scripts/` directory from the root of this repository. That directory contains
`README.md` which describes the specifics of each script and what it does.

The specification is in the `/docs` folder from the root of the repository. The `index.html` file contains the static
text that can be found in the spec. This document references different sections which can be found in the `/docs/sections`
directory.

## Conventions

While there are not any strict conventions, there are specific guidelines that are followed
for defining a consistent style with respect to schemas. They are described as follows.

1. Verifiable Credentials should not declare any top-level properties not defined in the [vc-core spec](https://www.w3.org/TR/vc-data-model/)
2. All of the properties for a credential type should be declared in the `credentialSubject`
3. `type` properties should be declared as an array for simplification
4. An attempt should be made to use existing `common` types before declaring new ones
5. RDF classes should not be declared with any undefined terms
6. Example JSON files must include _all_ of the properties defined in the JSON schema

## Continuous Integreation

When submitting a pull request, the proposed changes must pass the Continuous Integration tests.
These tests can be run in the local developer environment by running `npm test` from the root
of the repository. This will run the tests located in the `/packages/traceability-schemas/__tests__/`
folder.

Common errors when not passing these tests include:

1. Malformed or incorrect `.yml` indentation
2. Incorrect OpenAPI `.yml` syntax
3. Broken proofs as a result of context changes
4. Example JSON files that don't pass schema validation
5. Cascading changes as a result of changing a `common` RDF class used by multiple files

## Continuous Deployment

After a pull request is merged, the Continuous Delivery (CD) script will create the spec document
which is deployed to [https://w3c-ccg.github.io/traceability-vocab/](https://w3c-ccg.github.io/traceability-vocab/).
The scripts which produce this document are described as follows.

1. `schemas-to-openapi.js` builds the YAML (`.yml`) file for the [OpenAPI Spec](https://w3c-ccg.github.io/traceability-vocab/openapi/)
2. `openapi-to-context.js` builds the JSON-LD context from the OpenAPI spec which is written to `/docs/contexts/traceability-v1.jsonld`
3. `schemas-to-vocab.js` builds the HTML (`.html`) files for the schemas which are referenced from `/docs/index.html` in the spec

## Generating Proofs

New credentials can be added to the vocabulary by adding a new file inside `/docs/openapi/components/schemas/credentials/`
with issuer `did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn`. From there you can go to the
`/packages/traceability-schemas/scripts/` directory and run `node regenerate.js`. This will generate a proof for credentials
without a proof, or fail to validate because of a broken proof.
