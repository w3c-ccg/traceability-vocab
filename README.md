## Traceability Vocabulary Specification

![CI](https://github.com/w3c-ccg/traceability-vocab/workflows/CI/badge.svg)

This specification describes a Linked Data vocabulary for asserting
Verifiable Credentials related to traceability information, such as chemical properties, mechanical properties, country of origin, and other
attributes used to determine the status of a products and materials in a supply chain.

We encourage contributions meeting the [Contribution
Guidelines](CONTRIBUTING.md). While we prefer the creation of issues
and Pull Requests in the GitHub repository, discussions often occur
on the
[public-credentials](http://lists.w3.org/Archives/Public/public-credentials/)
mailing list as well.

### Getting Started

This repository takes a "test / code first" approach to vocabulary development and deals specifically with data types required for 
track and trace of supply chain data, particularly in a cross border context.  Focus is especially given to schema objects that describe
common supply chain elements, shared by multiple use cases, as well as to items for which inspections and audits may be required, and thereby
merit creation of Verifiable Credentials to store the results of such an inspection for verification by a third party.

In order to have your contributions accepted you MUST:

1. Add synthetic data generation for any new data types / vocabulary terms.
2. Add any "special case" testing you believe is helpful for your data structures.
3. Run all tests locally and ensure they are all passing.
4. Generate the latest version of the spec to include your changes to vocabular / data model.
5. Open a Pull Request with your changes, a clear description of them in the description, and passing CI Tests.

#### Contributing to Vocabulary

All the terms, schemas and context definitions are generated from [./packages/test-vectors](./packages/test-vectors).

```
cd ./packages/test-vectors
npm i
npm run test
```

The commands above will build the spec and test vectors deterministically from source.

##### Adding a new type

1. create a [JSON Schema](https://json-schema.org/) in [./docs/schemas](./docs/schemas).
2. add synthetic data generation for it to [./packages/test-vectors/src/generators](./packages/test-vectors/src/generators).
3. update the config file to add the new type [./packages/test-vectors/src/generators/config.js](./packages/test-vectors/src/generators/config.js) by defining it and requiring the new type:
    ```
    const { getNewType } = require('./NewType');
    ```
    and adding to the config object:
    ```
    const generatorConfig = {
        NewType: getNewType,
        ...
    ```
4. run a build to generate the [test vectors](./packages/test-vectors) used in normal testing: `npm run build`
    Fix any errors found.
5. add the new test-vectors file to the testing process by modifying  [./packages/test-vectors/src/__fixtures__/index.js](./packages/test-vectors/src/__fixtures__/index.js)
and adding the path:
    ```
    const NewType = require('../../../../docs/test-vectors/NewType.json');
    ```
    then adding it to the module.exports:
    ```
    module.exports = {
        NewObject,
        ...
    ```
6. run tests and fix any errors: `npm run test`
5. review the latest spec changes by serving docs: `npx serve ./docs`.

Follow the conventions established for the other properties, for example:

###### Place

- [JSON Schema](./docs/schemas/Place.json)
- [Data Generator](./packages/test-vectors/src/generators/Place.js)
- [JSON-LD Context (derrived)](./docs/contexts/traceability-v1.jsonld)
- [Vocabular Definition (derrived)](https://w3c-ccg.github.io/traceability-vocab/#place)

If you are unsure of how to do something please open an issue, and ask for help.
