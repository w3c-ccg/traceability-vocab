/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const fs = require('fs');
const path = require('path');

const { schemas } = require('../services/schemas');
const descriptions = require('./descriptions.json');

const vocabPath = path.resolve(__dirname, '../../../docs/sections/vocab.html');
const credentialPath = path.resolve(
  __dirname,
  '../../../docs/sections/credentials.html'
);

const baseUrl = 'https://w3id.org/traceability';

const buildLinkedDataTable = (schema) => {
  const { $id, $linkedData } = schema;
  const row = $id ? `
    <tr>
      <td>
        <a href="https://swagger.io/specification/#schema-object">schema</a>
      </td>
      <td>
        <a href="${baseUrl + $id}">${baseUrl + $id}</a>
      </td>
    </tr>`
  : '';

  const section = `
    <table class="simple">
      <tbody>
        <tr>
          <td>
            <a href="https://json-ld.org/spec/latest/json-ld/#node-identifiers">@id</a>
          </td>
          <td>
            <a href="${$linkedData['@id']}">${$linkedData['@id']}</a>
          </td>
        </tr>
        ${row}
      </tbody>
    </table>
  `;

  return section;
};

const buildFigure = (term) => {
  if (!descriptions[term]) {
    return '';
  }

  const { src, alt, caption } = descriptions[term];
  return `
    <figure>
      <img src="${src}" alt="${alt}" style="width:50%"/>
      <figcaption>
        <span class="fig-title">${caption}</span>
      </figcaption>
    </figure>
  `;
};

const buildProperty = (property) => `
    <section>
      <h3>${property.$linkedData.term}</h3>
      <p>${property.description}</p>
      ${buildLinkedDataTable(property)}
    </section>
  `;

const buildClass = (schema) => {
  let table = '';

  try {
    table = `${buildLinkedDataTable(schema)}`;
  } catch (e) {
    console.error('error building table: ', e);
  }

  const figure = buildFigure(schema.$linkedData.term);
  const section = `
    <section>
      <h3 id="${schema.$linkedData.term}">${schema.title}</h3>
      ${figure}
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

const separateSchemas = (schemaList) => {
  // Define Arrays to sort the schemas into
  const credentialSchemas = [];
  const vocabSchemas = [];

  // Separates Schemas into Credentials and Vocabulary
  schemaList.forEach((schema) => {
    const { example } = schema;
    const obj = JSON.parse(example);
    const type = Array.isArray(obj.type) ? obj.type : [obj.type];
    if (type.indexOf('VerifiableCredential') === -1) {
      vocabSchemas.push(schema);
    } else {
      credentialSchemas.push(schema);
    }
  });

  // Generate the text for each respective section
  const credentials = credentialSchemas.map(buildVocabSection).join('\n');
  const vocab = vocabSchemas.map(buildVocabSection).join('\n');

  // Return the html text for each section
  return { credentials, vocab };
};

(() => {
  console.log('🧪 build vocab from schemas');
  const { credentials, vocab } = separateSchemas(schemas);

  // Write the text of the sections into a file to be included
  fs.writeFileSync(vocabPath, vocab);
  fs.writeFileSync(credentialPath, credentials);
})();
