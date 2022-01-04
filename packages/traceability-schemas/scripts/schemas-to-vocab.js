/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const fs = require('fs');
const path = require('path');

const { schemas } = require('../services/schemas');

const vocabPath = path.resolve(__dirname, '../../../docs/sections/vocab.html');

const baseUrl = 'https://w3id.org/traceability';

const buildLinkedDataTable = (schema) => {
  const { $id, $linkedData } = schema;
  const section = `
  <table class="simple">
  <tbody>

  <tr>
    <td><a href="https://json-ld.org/spec/latest/json-ld/#node-identifiers">@id</a></td>
    <td><a href="${$linkedData['@id']}">${$linkedData['@id']}</a></td>
  </tr>
  
  ${
    $id
      ? `
<tr>
  <td><a href="https://swagger.io/specification/#schema-object">schema</a></td>
  <td><a href="${baseUrl + $id}">${baseUrl + $id}</a></td>
</tr>`
      : ''
  }

  </tbody>
  </table>
  `;
  return section;
};

const buildProperty = (property) => {
  const section = `
  <section>
  <h2>${property.$linkedData.term}</h2>
  <p>${property.description}</p>
  ${buildLinkedDataTable(property)}
  </section>
  `;
  return section;
};

const buildClass = (schema) => {
  let table = '';
  const props = '';
  try {
    table = `
  ${buildLinkedDataTable(schema)}
  `;
  } catch (e) {
    console.error('error building table: ', e);
  }

  // lets not render props for now.
  // try {
  //   props = `
  // ${Object.values(schema.properties).map(buildProperty).join('\n')}
  // `;
  // } catch (e) {
  //   console.error('error building props: ', e);
  // }

  const section = `
  <section id="${schema.$linkedData.term}">
  <h2>${schema.title}</h2>
  <p>${schema.description}</p>

  ${table}

<pre class="example">
${schema.example}
</pre>

 
  </section>
  `;
  return section;
};

const buildVocabSection = (schema) => {
  if (schema.type === 'object' || schema.anyOf) {
    return buildClass(schema);
  }
  return buildProperty(schema);
};

(async () => {
  console.log('🧪 build vocab from schemas');
  const sections = schemas.map(buildVocabSection).join('\n');
  const section = `
<section id="vocabulary" class="normative">
<h2>Vocabulary </h2>

<section id="Open API" class="informative">
  <h2>Open API</h2>
  <p>
    This vocabulary can also be viewed as an
    <a href="https://w3id.org/traceability/openapi/">Open API Specification</a>.
  </p>
</section>

<section>
<h3 id="undefinedTerm">Undefined Terms</h3>
<p>This vocabulary uses <code> '@vocab': 'https://w3id.org/traceability/#undefinedTerm' </code>
    to disable JSON-LD related errors associated with Verifiable Credentials, issued about
    terms that have not yet been added here.
</p>
</section>

<section>
<h2>Defined Terms</h2>
${sections}
</section>
</section>
  `;
  fs.writeFileSync(vocabPath, section);
})();
