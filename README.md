## Traceability Vocabulary Specification

![CI](https://github.com/w3c-ccg/traceability-vocab/workflows/CI/badge.svg)

This specification describes a Linked Data vocabulary for asserting Verifiable Credentials related to traceability information, such as chemical properties, mechanical properties, country of origin, and other attributes used to determine the status of a products and materials in a supply chain.

We encourage contributions meeting the [Contribution Guidelines](CONTRIBUTING.md). While we prefer the creation of issues and Pull Requests in the GitHub repository, discussions often occur on the [public-credentials](http://lists.w3.org/Archives/Public/public-credentials/) mailing list as well.

### Versioning

This repository will be versioned at periodic points in time with a Q1 Calendar Year target for major releases.  Versioning tags will follow a pattern of `[MAJOR].[MINOR].[PATCH]` 
Version Definitions:

- MAJOR - significant changes rolled forward from the previous major version.  Major versions MAY include breaking or non-backwards compatible changes
- MINOR - backwards compatible changes that may introduce new functionality or extensions of objects that are backwards compatible
- PATCH - minor changes that are non breaking and resolve discovered issues or bugs

As a rule, versioning will follow the specification outlined in the [Semantic Versioning 2.0](https://semver.org/) spec

This approach to versioning gives the ability to integrate with and provided automated testing and validation against defined types without worry of instability or breaking changes being introduced, while also limiting the frequency of possibly breaking changes to prevent a large number of incompatible versions.

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
6. Any references to schemas you wish to include in your schema should be recreated locally and referenced there.  In these local schemas, only include the properties relevant to the schema you have created.  For example, [Person](https://schema.org/Person) is an existing schema on schema.org, but a Person.json schema has been added to this repo, including only the relevant and used properties for the other traceability schemas.  This is to hopefully make traceability schemas easier to understand and manage by not incorporating too many unnecessarily large schemas.  The schemas that have been made local in this way (like Person.json) should still reference the schema.org entry like so:
```
    "$comment": "{\"term\": \"Person\", \"@id\": \"https://schema.org/Person\"}",
```

Pull requests will not as a rule be merged if any conflicts exist, or if testing is incomplete.

Any changes that potentially introduce breaking or non-backwards compatible functionality MUST have a corresponing issue and discussion, and will require consensus from the editors in order to be introduced or to have any related Pull Requests accepted and merged.

A one week (7 day) period will be provided for review of pull requests related to data schemas or project functionality prior to merge to allow suffient review time.  Execptions may be made for essential documentation, or to allow for immediate hotfix of security issues.

#### Project Structure

This project uses [lerna](https://github.com/lerna/lerna) to manage packages and dependencies as a single project.

There are two primary packages managed by lerna: 

- [test-vectors](./packages/test-vectors) which contains the tests and assets related to the vocabulary itself 
- [js-vc-ci-tests](./packages/js-vc-ci-tests) which manages the continuous integration tests related to various VCs

In addition the following key areas in the repo should be noted for understanding how to add schemas and understand the code layout:

- The index file in [docs](./docs/index.html) is the master public facing documentation page
- JSON Schema for each object to be referenced is stored in the [schemas](.docs/schemas) folder
- Code Generation to create synthetic test data is located in [generators](./packages/test-vectors/src/generators)
- Test Vectors are located in the [test vectors](./packages/test-vectors) folder, and correspond to the defined schemas
- [Contexts](./docs/contexts) stores the interim combined json-ld vocabulary for test and verification
- Verifiable Credential Examples are located in the appropriately named [credential](./docs/credentials/) folder

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

##### Adding a new type for use as a Verifiable Credential
If you plan on using a type that you have added as a [Verifiable Credential](https://www.w3.org/TR/vc-data-model/) you should also add a valid VC example in json format to the [credentials](./docs/credentials/) folder.  See [Ag Inspection Report](./docs/credentials/AgInspectionReport.json) for a basic example.  Credential examples SHOULD use Ed25519 and MAY include credential status as in [Legal Entity Identifier](./docs/credentials/LegalEntityIdentifierCredential.json)


####  Additional notes
Please follow the conventions established for the other properties, for example:

###### General Formatting and Guidelines
UTF-8 should be used as the standard encoding for all assets in this repository, and any services utilizing these objects as schemas should support UTF-8

Wherever possible JSON-LD in use as a Verifiable Credential should be ["small in size"](https://www.w3.org/TR/vc-imp-guide/#pf4a).  Some harder limits will likely be established based on common and broadly distributed VC libraries but at this time be aware that a VC could be rejected from this repo for exceeding reasonable size limits

###### Date / Time
Wherever possible, dates should be formatted as `YYYY-MM-DD` so as to be directly compatible with `xsd:date`.

###### Place

- [JSON Schema](./docs/schemas/Place.json)
- [Data Generator](./packages/test-vectors/src/generators/Place.js)
- [JSON-LD Context (derrived)](./docs/contexts/traceability-v1.jsonld)
- [Vocabular Definition (derrived)](https://w3c-ccg.github.io/traceability-vocab/#place)

##### Sample .ENV

 ```
  BUILD_SPEC=true/false // generates new files for schema when running npm run build
 ```

If you are unsure of how to do something please open an issue, and ask for help.
