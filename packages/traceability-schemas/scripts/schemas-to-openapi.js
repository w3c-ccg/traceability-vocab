/* eslint-disable operator-linebreak */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const getAllJsonFilesFromDirectory = (targetDirectory) => {
  const files = fs
    .readdirSync(targetDirectory)
    .filter((f) => f.indexOf('.yml') !== -1);
  return files;
};

(async () => {
  console.log('🧪 building open api from components directory...');
  const newSchemas = getAllJsonFilesFromDirectory(
    path.resolve(__dirname, '../../../docs/openapi/components/schemas/common')
  );

  const template = `
openapi: 3.0.0
info:
  title: Traceability Schemas
  version: 1.0.0
servers:
  - url: http://localhost:5000/openapi/components
  - url: https://w3id.org/traceability/openapi/components
`;

  const endpoints = [];
  newSchemas.forEach((sname) => {
    if (sname === 'Context.yml') {
      return;
    }
    const endpoint = `
  /schemas/common/${sname}:
    get:
      tags:
      - Common
      responses:
        '200':
          content:
            application/yml:
              schema:
                $ref: './components/schemas/common/${sname}'
    `;
    endpoints.push(endpoint);
  });

  const finalAPI = `${template}\npaths:${endpoints.join('\n')}`;

  fs.writeFileSync(
    path.resolve(__dirname, '../../../docs/openapi/openapi.yml'),
    finalAPI
  );
})();
