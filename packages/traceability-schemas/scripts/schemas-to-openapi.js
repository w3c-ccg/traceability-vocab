/* eslint-disable operator-linebreak */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
const fs = require('fs');
const path = require('path');

const getAllJsonFilesFromDirectory = (targetDirectory) => {
  const files = fs
    .readdirSync(targetDirectory)
    .filter((f) => f.indexOf('.yml') !== -1);
  return files;
};

const getTagsFromDirectory = () => {
  const dirs = fs.readdirSync(
    path.resolve(__dirname, '../../../docs/openapi/components/schemas/')
  );
  const index = dirs.indexOf('snippets');
  if (index !== -1) {
    dirs.splice(index, 1);
  }
  return dirs;
};

const getEndpointsFromSchemaNames = (tag) => {
  const newSchemas = getAllJsonFilesFromDirectory(
    path.resolve(__dirname, `../../../docs/openapi/components/schemas/${tag}`)
  );
  const endpoints = [];
  newSchemas.forEach((sname) => {
    if (sname === 'Context.yml') {
      return;
    }
    const endpoint = `
  /schemas/${tag}/${sname}:
    get:
      tags:
      - ${tag}
      responses:
        '200':
          content:
            application/yml:
              schema:
                $ref: './components/schemas/${tag}/${sname}'
    `;
    endpoints.push(endpoint);
  });

  return endpoints;
};

(async () => {
  console.log('🧪 building open api from components directory...');

  const template = `
openapi: 3.0.0
info:
  title: Traceability Schemas
  version: 1.0.0
servers:
  - url: https://w3id.org/traceability/openapi/components
  - url: http://localhost:5000/openapi/components
`;

  const tags = getTagsFromDirectory();
  const endpoints = tags.map(getEndpointsFromSchemaNames).flat();
  const finalAPI = `${template}\npaths:${endpoints.join('\n')}`;

  fs.writeFileSync(
    path.resolve(__dirname, '../../../docs/openapi/openapi.yml'),
    finalAPI
  );
})();
