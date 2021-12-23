const { check } = require('@transmute/jsonld-schema');
const documentLoader = require('../services/documentLoader');

const { schemas } = require('../services/schemas');

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
