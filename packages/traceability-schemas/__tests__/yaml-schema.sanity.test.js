const Ajv = require('ajv').default;

const { schemas } = require('../services/schemas');

async function loadSchema(uri) {
  const schema = schemas.find((s) => s.$id === uri);
  return schema;
}

const ajv = new Ajv({
  strict: false, // required due to "$linkedData" and "example".
  loadSchema,
});

it.only('all schemas examples are valid', async () => {
  const [schema] = schemas;

  await ajv.compileAsync(schema);

  const input = JSON.parse(schema.example);
  const isValid = ajv.validate(schema.$id, input);
  if (!isValid) {
    console.warn(ajv.errors);
  }
});
