const Ajv = require('ajv').default;
const { check } = require('@transmute/jsonld-schema');
const documentLoader = require('../services/documentLoader');
const { schemas } = require('../services/schemas');

const ajv = new Ajv({
  strict: false, // required due to "$linkedData" and "example".
});

schemas.forEach((s) => {
  try {
    const schema = {
      ...s,
      $id: `#${s.$linkedData.term}`,
    };
    ajv.addSchema(schema);
  } catch (e) {
    ///
  }
});

it('schemas is an array', () => {
  expect(Array.isArray(schemas)).toBe(true);
});

it('all schemas have an example', () => {
  expect(
    schemas.every((s) => {
      const p = typeof s.example === 'string';
      if (!p) {
        console.warn('missing example: ', s);
      }
      return p;
    })
  ).toBe(true);
});

it('all schemas examples are valid json', () => {
  expect(
    schemas.every((s) => {
      try {
        JSON.parse(s.example);
      } catch (e) {
        console.warn('failed to parse json: ', s);
        return false;
      }
      return true;
    })
  ).toBe(true);
});

it.only('all schemas examples are valid', async () => {
  const checks = await Promise.all(
    schemas.map(async (s) => {
      const input = JSON.parse(s.example);

      const isValid = ajv.validate(`#${s.$linkedData.term}`, input);

      if (!isValid) {
        console.warn(s.$linkedData.term, ajv.errors);
      }

      return true;
    })
  );
  expect(checks.every((s) => s)).toBe(true);
});

// due to the use of @vocab, we expect this to almost never error.
it('all schemas examples are valid json-ld', async () => {
  const checks = await Promise.all(
    schemas.map(async (s) => {
      const input = JSON.parse(s.example);
      const { ok, error } = await check({
        input: { '@context': 'https://w3id.org/traceability/v1', ...input },
        documentLoader,
      });
      if (!ok) {
        console.warn('JSON-LD Error: ', error);
      }
      return ok;
    })
  );
  expect(checks.every((s) => s)).toBe(true);
});
