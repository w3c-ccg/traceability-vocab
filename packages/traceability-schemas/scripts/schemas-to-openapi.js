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

const dirs = ['common', 'credentials', 'presentations', 'snippets'];

// eslint-disable-next-line arrow-body-style
const getTagsFromDirectory = () => {
  return dirs;
};

const paths = dirs.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {});

const getEndpointsFromSchemaNames = (tag) => {
  const newSchemas = getAllJsonFilesFromDirectory(
    path.resolve(__dirname, `../../../docs/openapi/components/schemas/${tag}`)
  );
  newSchemas.forEach((sname) => {
    if (sname === 'Context.yml') {
      return;
    }
    const endpoint = `/schemas/${tag}/${sname}:
  get:
    tags:
      - ${tag}
    responses:
      '200':
        content:
          application/yml:
            schema:
              $ref: '../components/schemas/${tag}/${sname}'
`;
    paths[tag].push(endpoint);
  });

  return paths;
};

(async () => {
  console.log('🧪 building open api from components directory...');

  const finalAPI = `openapi: 3.0.0
info:
  title: Traceability Schemas
  version: 1.0.0
servers:
  - url: https://w3id.org/traceability/openapi/components
  - url: http://localhost:3000/openapi/components

paths:
  allOf:
    - $ref: './paths/common.yml'
    - $ref: './paths/credentials.yml'
    - $ref: './paths/presentations.yml'
    - $ref: './paths/snippets.yml'
    - $ref: './paths/workflows.yml'
`;

  const tags = getTagsFromDirectory();
  tags.map(getEndpointsFromSchemaNames).flat();
  // eslint-disable-next-line guard-for-in
  for (const openapiPath in paths) {
    const schemaPath = paths[openapiPath].join('\n');
    fs.writeFileSync(
      path.resolve(__dirname, `../../../docs/openapi/paths/${openapiPath}.yml`),
      schemaPath
    );
  }
  fs.writeFileSync(
    path.resolve(__dirname, '../../../docs/openapi/openapi.yml'),
    finalAPI
  );
})();
