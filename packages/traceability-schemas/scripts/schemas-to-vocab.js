/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const fs = require('fs');
const path = require('path');

const { schemas } = require('./help');

const vocabPath = path.resolve(
  __dirname,
  '../../../docs/sections/vocab-2.html'
);

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
  <td><a href="${$id}">${baseUrl + $id}</a></td>
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
  const section = `
  <section id="${schema.$linkedData.term}">
  <h2>${schema.title}</h2>
  <p>${schema.description}</p>

  <pre class="example">
${schema.example}
  </pre>

  ${buildLinkedDataTable(schema)}

  ${Object.values(schema.properties).map(buildProperty).join('\n')}
  </section>
  `;
  return section;
};

const buildVocabSection = (schema) => {
  if (schema.type === 'object') {
    return buildClass(schema);
  }
  return buildProperty(schema);
};

(async () => {
  console.log('🧪 build vocab from schemas');
  const sections = schemas.map(buildVocabSection).join('\n');
  const section = `
<section id="vocabulary-2" class="normative">
<h2>Vocabulary 2 (preview) </h2>
${sections}
</section>
  `;
  fs.writeFileSync(vocabPath, section);
})();
