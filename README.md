# Traceability Vocabulary Specification

![CI](https://github.com/w3c-ccg/traceability-vocab/workflows/CI/badge.svg) [![CD](https://github.com/w3c-ccg/traceability-vocab/actions/workflows/cd.yml/badge.svg)](https://github.com/w3c-ccg/traceability-vocab/actions/workflows/cd.yml)

## About

This specification describes a Linked Data vocabulary for asserting Verifiable
Credentials related to traceability information, such as chemical properties,
mechanical properties, country of origin, and other attributes used to determine
the status of products and materials in a supply chain.

We encourage contributions meeting the [Contribution
Guidelines](CONTRIBUTING.md). While we prefer the creation of 
[Issues](https://github.com/w3c-ccg/traceability-vocab/issues) and 
[Pull Requests](https://github.com/w3c-ccg/traceability-vocab/pulls) in the 
GitHub repository, discussions often occur on the
[public-credentials](http://lists.w3.org/Archives/Public/public-credentials/)
mailing list as well, and at regular public meetings ([see below](#meetings)).

## Latest Spec

<https://w3id.org/traceability>

## Meetings and Hosting

Meetings and hosting instructions are in [`traceability-interop/MEETINGS.md`](https://github.com/w3c-ccg/traceability-interop/blob/main/MEETINGS.md)

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md). The basics are as follow:

```
npm i
npm run lint
npm run test
npm run build
npm run serve
```

### Adding HTML to a Credential Definition

Add a tag to your schema:

```
title: Mill Test Report Credential
tags:
  - Steel
  - CATAIR // <-- your new tag
```

Update the section rendering logic to use that tag:

```js
const htmlSectionSchemaTags = 'CATAIR';

...

let catair = ``;
    const {$id} = schema;
    if (schema.tags && schema.tags.includes(htmlSectionSchemaTags) ) {
      const htmlExtension = $id.split('/').pop().replace('.yml', '.html');
      catair = fs.readFileSync(path.resolve(
        __dirname,
        `../../../docs/sections/catair/${htmlExtension}`
      )).toString();
    }
  const section = `
    <section id="${schema.$linkedData.term}">
      <h2>${schema.title}</h2>
      <p>${schema.description}</p>
      ${table}
      ${catair && `<section><h2>Table View</h2>${catair}</section>`}
      <pre class="example">${schema.example}</pre>
      ${depList}
    </section>
  `;
```

Any credentials with this tag MUST have an html section defined and named according to the example above.