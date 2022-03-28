/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const fs = require('fs');
const path = require('path');

const { schemas } = require('../services/schemas');

const vocabPath = path.resolve(__dirname, '../../../docs/sections/vocab.html');
const credentialPath = path.resolve(__dirname, '../../../docs/sections/credentials.html');

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

  const credentialSection = `
    <section>
      <h2>Credentials</h2>
      ${credentials}
    </section>
  `;

  const vocabSection = `
    <section>
      <h2>Vocabulary</h2>
      ${vocab}
    </section>
  `;

  fs.writeFileSync(credentialPath, credentialSection);
  fs.writeFileSync(vocabPath, vocabSection);
})();
