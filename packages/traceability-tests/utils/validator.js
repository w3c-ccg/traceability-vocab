const Ajv = require('ajv');
const addFormats = require('ajv-formats').default;
const jose = require('jose');
const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const dereferenceSchema = async (id) => {
  // For example: https://w3c-ccg.github.io/traceability-vocab/openapi/components/schemas/credentials/ActivityPubActorCard.yml
  if (id.endsWith('/ActivityPubActorCard.yml')) {
    const schemaYml = fs
      .readFileSync(
        path.resolve(
          __dirname,
          '../../../docs/openapi/components/schemas/credentials/ActivityPubActorCard.yml'
        )
      )
      .toString();
    const schemaJson = JSON.parse(JSON.stringify(yaml.load(schemaYml)));
    return schemaJson;
  }
  // handle relative refs... (they don't start with https)
  const base = 'https://w3id.org/traceability/openapi/components/schemas/';
  if (!id.startsWith('https')) {
    const { data } = await axios.get(`${base}${id}`);
    const loaded = yaml.load(data);
    const json = JSON.parse(JSON.stringify(loaded));
    return json;
  }
  throw new Error(`Unresolvable schema: ${id}`);
};

const ajv = new Ajv({
  strict: false, // see https://github.com/w3c-ccg/traceability-vocab/issues/786
  loadSchema: dereferenceSchema,
});
addFormats(ajv);

const validator = (id) => ({
    validate: async (instance) => {
      const schema = await dereferenceSchema(id);
      const validate = await ajv.compileAsync(schema);
      const valid = validate(instance);
      if (validate.errors) {
        console.error(validate.errors);
      }
      return valid;
    },
  });

const api = {
  validator,
};

module.exports = api;
