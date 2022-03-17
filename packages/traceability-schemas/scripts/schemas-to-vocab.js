/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const fs = require('fs');
const path = require('path');

const { schemas } = require('../services/schemas');

const vocabPath = path.resolve(__dirname, '../../../docs/sections/vocab.html');
const vcPath = path.resolve(__dirname, '../../../docs/sections/vcs.html');

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

  const section = `
  <section>
  <h3 id="${schema.$linkedData.term}">${schema.title}</h3>
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
  const vocab = schemas
    .filter((schema) => {
      const { example } = schema;
      const obj = JSON.parse(example);
      const type = Array.isArray(obj.type) ? obj.type : [obj.type];
      return type.indexOf('VerifiableCredential') === -1;
    })
    .map(buildVocabSection)
    .join('\n');
  const vcs = schemas
    .filter((schema) => {
      const { example } = schema;
      const obj = JSON.parse(example);
      const type = Array.isArray(obj.type) ? obj.type : [obj.type];
      return type.indexOf('VerifiableCredential') !== -1;
    })
    .map(buildVocabSection)
    .join('\n');
  console.log(vocabPath.length);
  console.log(vcPath.length);
  fs.writeFileSync(vocabPath, vocab);
  fs.writeFileSync(vcPath, vcs);
})();
