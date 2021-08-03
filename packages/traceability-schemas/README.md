# Traceability Schemas

This module contains all the JSON Schema used to build the traceability vocab.

It also contains all the programmatic update code for automatically generating the resources used to produce the traceability spec.

If you are just adding vocabulary items, you should only ever need to:
- Create a JSON schema definition in the `schemas` folder. The schema JSON file should be named to match the type.
- Create a corresponding generator for known "good" data in the `src/generators/` folder.  The generator file name should be identical to the corresponding schema, with an extension and filetype of `.js`.

Schemas should be named simply, and defined at a high a level as is reasonable.  Words such as 'credential' are redundant and should not be included in schema names.  For instance, a good schema name for a type that represents data about a "product" is `Product`; a BAD example would be `ProductCredential`.  A good sub-type that extends `Product` with properties specific to some certain market would be `OrganicProduct`, assuming that an `OrganicProduct` had some specific attributes that are not represented in `Product`.  If the parent type accurately describes all attributes that are required, then a sub-type should not be created. If the only difference is a need to specify that the item is some specific "type" (in human english language meaning) of "Organic Product", then consideration should be given to adding a field to `Product` that specifies the "product type", such as `Product.productType`.  This prevents duplicate redundant objects and allows for sane querying and business rules handling of common objects. 

If the Schema you are authoring has re-use across multiple markets, commodities, or other supply chain areas, consider authoring an object at the highest level at which it still contains the most common properties across different use cases, and then sub-type as needed.  This aids others in getting and using single and common asset types across markets.

## Detailed Build Process

The scripts in this repo MUST be run the following order:

### 1. Build Schemas

This generates the actual `index.js` that is then used to wrap all detected schemas in the schemas folder
```
npm run build:schemas
```

### 2. Build Intermediate

The Intermediatefile coalesces the schemas into a single file to utilize for context creation 
```
npm run build:intermediate
```

### 3. Build Context

Builds the actual json-ld context for testing in later steps, and assuming that any changes made are fine, is utilized to generate the final json-ld context
```
npm run build:context
```

### 4. Build Test Vectors

Creates good / bad / credential examples for each identified schema that also has a matching generator in `src/generators`. This stage is what builds the actual fixtures for testing in `src/__fixtures__`
```
npm run build:test-vectors
```

### 5. Build Credential Examples

Iterates each schema discovered that also has one or more "good" examples, takes the first "good" example, and attempts to issue a VC with the example as the credential to be issued around.
```
npm run build:credentials
```

### 6. Validate Test Vectors

Steps through each example fixture found, good, bad, credential, and vc, and sanity checks them for JSON Schema compliance, credential sanity, etc.
```
npm run build:validate
```

### 7. Build Vocab

After each item has been built successfully and tested, then the actual vocabulary for the spec is built here.
```
npm run build:vocab
```

### 8. Build Open API Stubs

After vocab creation for the spec successfully completes, and we know that each item has sane examples and can validate, then we proceed to step through each schema and build a reference OpenAPI definition with example methods for each item. 
```
npm run build:open-api
```


## Project Layout

The Annotated tree structure is below with notes in braces
```
├── index.js              { auto-generated }
├── README.md             { this file }
├── schemas               { holds each schema }
├── scripts               { contains the build/test scripts }
└─── src                  { core source code}
   ├── data               { reference data and generators }
   ├── generators         { good data generator files }
   ├── __fixtures__       { auto-generated test assets }
   └── __tests__          { core spec tests }
````
