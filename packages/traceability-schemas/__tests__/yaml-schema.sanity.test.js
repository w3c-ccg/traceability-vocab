const { schemas, ajv } = require('../services/schemas');

it('can validate schema with loader.', async () => {
  const [schema] = schemas;
  await ajv.compileAsync(schema);
  const input = JSON.parse(schema.example);
  const isValid = ajv.validate(schema.$id, input);
  if (!isValid) {
    console.warn(ajv.errors);
  }
  expect(isValid).toBe(true);
});
