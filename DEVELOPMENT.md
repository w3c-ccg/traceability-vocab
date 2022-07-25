# Development

The purpose of this document is to describe to developers how to navigate this repository
in order make meaningful contributions to this product.

## Getting Started

To get started building, testing, or contributing to this repository, you will need [Node.js](https://nodejs.org) and [git](https://git-scm.com/).

```
git clone https://github.com/w3c-ccg/traceability-vocab.git
cd traceability-vocab
npm i
```

You can local a version of the [spec](https://w3c-ccg.github.io/traceability-vocab/) you can run:

```
npx serve ./docs
```

## Directory Structure

The primary focus on this repository is to define schemas which decribe Verifiable Credentials which acts as a digitally
equavalent signed form of a document. These credentials can be found in the `/docs/openapi/components/schemas/credentials/`
directory from the root of this repository.

In order to use standard re-usable parts for defining RDF classes in credentials, we have a `common` folder located at
`/docs/openapi/components/schemas/common/` to store these classes. As a comparison to React think of `credentials` as
top-level pages, and think of `common` as the components that make up these pages.

Presentations are a way to exchange credentials between parties. Presentations can have a specific schema or structure
that defines a specific workflow. One such workflow definition would be a workflow for importing steel. Presentation
definitions can be found in the `/docs/openapi/components/schemas/presentations/` directory.

When the `npm i` command is run, it will generate the JSON-LD context from the schemas. This context is found at
`/docs/contexts/traceability-v1.jsonld` from the root of this repository.

There are several scripts in this repository for compiling trace vocabulary. These scripts can be found in the
`/packages/traceability-schemas/scripts/` directory from the root of this repository. That repository contains
`README.md` which describes the specific of each script and what they do.

## Conventions

While there are not any strict conventions, there are specific guidelines that are followed
for defining a consistent style with respect to schemas.

## Continuous Integreation

Here we describe the CI process that runs on a pull request and how to run the tests locally

## Continuous Deployment

Here we define continuous deployment and the script associated with it
