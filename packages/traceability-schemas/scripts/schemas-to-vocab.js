/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const fs = require('fs');
const path = require('path');
const { load } = require('js-yaml');

const { schemas } = require('../services/schemas');

const vocabPath = path.resolve(__dirname, '../../../docs/sections/vocab.html');
const credentialPath = path.resolve(
  __dirname,
  '../../../docs/sections/credentials.html'
);
const workflowPath = path.resolve(
  __dirname,
  '../../../docs/sections/workflows.html'
);

const baseUrl = 'https://w3id.org/traceability';

const htmlSectionSchemaTags = 'CATAIR';

const buildLinkedDataTable = (schema) => {
  const { $id, $linkedData } = schema;
  if (!$linkedData) {
    return '';
  }

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
  try {
    table = buildLinkedDataTable(schema);
  } catch (e) {
    console.error('error building table: ', e);
  }

  if (!schema.$linkedData) {
    return '';
  }

  const props = schema.properties ? Object.keys(schema.properties) : [];
    let catair = '';
    const { $id } = schema;
    if (schema.tags && schema.tags.includes(htmlSectionSchemaTags)) {
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
    if (!schema.example) {
      return;
    }

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

const buildWorkflowSection = () => {
  const files = fs.readdirSync(
    path.resolve(__dirname, '../../../docs/openapi/components/schemas/workflows')
  );

  const w = [];
  files.forEach((file) => {
    const ymlText = fs.readFileSync(
      path.resolve(__dirname, `../../../docs/openapi/components/schemas/workflows/${file}`)
    );
    const yml = load(ymlText);
    const {
 title, description, credentials, mermaid
} = yml;

    const types = credentials.reduce((prev, curr) => {
      const { name, id } = curr;
      const li = `<li><a href="${id}">${name}</a></li>`;
      return prev + li;
    }, '');

    w.push(`
      <h3>${title}</h3>
      <pre class='mermaid'>${mermaid}</pre>
      <p>${description}</p>
      <b>Credentials Used:</b>
      <ol>
        ${types}
      </ol>
      <pre class='example yml'>${ymlText}</pre>
    `);
  });

  return w.join('\n');
};

(() => {
  console.log('🧪 build vocab from schemas');
  const { credentials, vocab } = separateSchemas(schemas);
  const workflows = buildWorkflowSection();

  const credentialSection = `
    <section>
      <h2>Credentials</h2>
      <p>
        This section lists Verifiable Credential schemas, targeting specific business use cases. These are issued, presented, and verified to execute business workflows. 
        Technically, these are all of <code>"type": "VerifiableCredential"</code>. 
      </p>      
      ${credentials}
    </section>
  `;

  const vocabSection = `
    <section>
      <h2>RDF Types</h2>
      ${vocab}
    </section>
  `;

  const workflowSection = `
    <section>
      <h2>Workflows</h2>
      ${workflows}
    </section>
  `;

  fs.writeFileSync(credentialPath, credentialSection);
  fs.writeFileSync(vocabPath, vocabSection);
  fs.writeFileSync(workflowPath, workflowSection);
})();
