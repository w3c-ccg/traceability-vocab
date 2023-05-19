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

## Meetings

Meetings are held

- Tuesdays at [13:30 ET/10:30 PT](http://www.timebie.com/std/newyork.php?q=13.5)
- Via [Jitsi](https://github.com/jitsi) in browser or 
  [standalone app](https://github.com/jitsi/jitsi-meet-electron/releases) 
- using this link: [meet.w3c-ccg.org/traceability](https://meet.w3c-ccg.org/traceability)
- With standing agenda to review open Pull Requests 
  ([trace-vocab](https://github.com/w3c-ccg/traceability-vocab/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-asc), 
  [trace-interop](https://github.com/w3c-ccg/traceability-interop/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-asc)),
  then open Issues 
  ([trace-vocab](https://github.com/w3c-ccg/traceability-vocab/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-asc), 
  [trace-interop](https://github.com/w3c-ccg/traceability-interop/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-asc)), 
  unless otherwise noted on the [mailing list](https://lists.w3.org/Archives/Public/public-credentials/)

Historical archives for meetings [can be found here](https://github.com/w3c-ccg/meetings).

### Hosting instructions

Any chair, editor, or other party authorized by CCG to manage recordings and
minutes can do the following.

#### Before the Meeting

- Duplicate the 
  [W3C-CCG Traceability Agenda Email Draft](https://docs.google.com/document/d/1Se_PIZNhIzZrwVftbYi-Z3oEMXvucQ7jNjxzjMVWCm4/edit) 
  in Google Docs
- Update all the items highlighted in yellow, in particular adding new agenda 
  items for week starting with item 6.
- If there are presentation materials, add them to the appropriate 
  [dated meeting archives folder](https://github.com/w3c-ccg/meetings/) 
  before the meeting.
- Send agenda to public-credentials@w3.org before each meeting. Use the 
  following format for the subject (modify date accordingly):
  ```
  [AGENDA] W3C CCG Traceability Call - 2022-11-22
  ```
- Confirm in the 
  [CCG mail archives](https://lists.w3.org/Archives/Public/public-credentials/) 
  that the agenda was sent correctly

#### During the Meeting
- Be sure to click **`Start Recording`** and then **`Stop Subtitles`**
- Make sure to link to the agenda at the beginning of the meeting (`Agenda: ...`)
- Make sure the scribe is identified (`Scribe: ...` or `scribe+ ...` 
  identifying someone else, or `scribe+` identifying oneself). Scribes, please 
  familiarize yourself with general scribing guidance 
  [here](https://www.w3.org/2008/04/scribe.html) and 
  [here](https://www.w3.org/2008/xmlsec/Group/Scribe-Instructions.html).
- Make sure topics are labeled when the topic changes (`Topic: ...`)
- Make sure that action items are listed so that they can be added to issues 
  later ("Action: ...")

#### After the Meeting
- Kick everyone from the meeting, and click **`Stop Recording`**
- [Publish the minutes](https://github.com/w3c-ccg/traceability-interop/tree/main/docs/weekly-minutes)


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