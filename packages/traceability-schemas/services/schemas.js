/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const Ajv = require('ajv').default;

const specPath = path.resolve(__dirname, '../../../docs/openapi/openapi.yml');

const apiSpec = yaml.load(fs.readFileSync(specPath, { encoding: 'utf-8' }));

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
    const { $ref } =
      endpoint.get.responses['200'].content['application/yml'].schema;
    let schema = fs.readFileSync(
      path.join(specPath.replace('/openapi.yml', ''), $ref),
      { encoding: 'utf-8' }
    );
    schema = yaml.load(schema);
    schema.$id = $ref.replace('./', '/openapi/');
    return schema;
  } catch (e) {
    console.error(endpoint, e);
  }
  return null;
};

const schemas = Object.values(apiSpec.paths)
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

module.exports = { schemas, ajv };
