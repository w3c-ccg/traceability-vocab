/* eslint-disable operator-linebreak */
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
          console.warn('Bad issue: ', input.issue);
          return true;
        }
        await ajv.compileAsync(s);
        const isValid = ajv.validate(s.$id, input);
        if (!isValid) {
          console.error(s.$linkedData.term, '\n', ajv.errors);
          return false;
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
