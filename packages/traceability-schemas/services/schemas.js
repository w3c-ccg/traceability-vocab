/* eslint-disable linebreak-style */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const Ajv = require('ajv').default;
const addFormats = require('ajv-formats').default;

const schemaKeys = ['common', 'credentials', 'presentations', 'snippets'];

const specPaths = [
  ...schemaKeys.map((sk) =>
    path.resolve(__dirname, `../../../docs/openapi/paths/${sk}.yml`)
  ),
];

const specPath = path.resolve(__dirname, '../../../docs/openapi/openapi.yml');
const dirPath = specPath
  .replace('/openapi.yml', '')
  .replace('\\openapi.yml', '');
const apiSpecPaths = Object.assign(
  {},
  ...specPaths.map((i) => yaml.load(fs.readFileSync(i, { encoding: 'utf-8' })))
);

const ignoreTags = ['Contexts'];

const ignoreEndpoint = (endpoint) => {
  let include = true;
  endpoint.get.tags.forEach((t) => {
    if (ignoreTags.includes(t)) {
      include = false;
    }
  });
  return include;
};

const extractSchemaFromEndpoint = (endpoint) => {
  try {
    const $ref =
      endpoint.get.responses['200'].content['application/yml'].schema.$ref.replace('../', './');
    const pathToSchema = path.join(dirPath, $ref);
    let schema = fs.readFileSync(pathToSchema, {
      encoding: 'utf-8',
    });
    schema = yaml.load(schema);
    schema.$id = $ref.replace('./', '/openapi/');
    return schema;
  } catch (e) {
    console.error(endpoint, e);
  }
  return null;
};

const schemas = Object.values(apiSpecPaths)
  .filter(ignoreEndpoint)
  .map(extractSchemaFromEndpoint)
  .filter((s) => !!s); // remove nulls

async function loadSchema(uri) {
  const schema = schemas.find((s) => s.$id === uri);
  return schema;
}

const ajv = new Ajv({
  strict: false, // required due to "$linkedData" and "example".
  loadSchema,
});
addFormats(ajv);

module.exports = { schemas, ajv };
