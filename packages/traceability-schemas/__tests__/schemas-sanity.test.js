/* eslint-disable operator-linebreak */
const { check } = require('@transmute/jsonld-schema');
const documentLoader = require('../services/documentLoader');
const { schemas, ajv } = require('../services/schemas');

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

it('all schemas examples are valid', async () => {
  const checks = await Promise.all(
    schemas.map(async (s) => {
      try {
        const input = JSON.parse(s.example);
        if (
          input.issue &&
          input.issue.startsWith(
            'https://github.com/w3c-ccg/traceability-vocab/issues/'
          )
        ) {
          return true;
        }
        await ajv.compileAsync(s);

        const isValid = ajv.validate(s.$id, input);
        if (!isValid) {
          console.error(s.$linkedData.term, '\n', s.example, '\n', ajv.errors);
        }

        return true;
      } catch (e) {
        console.error(s.$linkedData.term);
        console.error(e);
        return false;
      }
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
