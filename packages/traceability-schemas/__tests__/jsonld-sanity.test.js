const { check } = require('@transmute/jsonld-schema');
const documentLoader = require('../services/documentLoader');

it('should error when no @context is present', async () => {
  const input = {};
  const { ok, error } = await check({
    input,
    documentLoader,
  });
  expect(ok).toBe(false);
  expect(error).toEqual({
    type: 'jsonld.SyntaxError',
    details: 'Invalid JSON-LD syntax; @context must be an object.',
  });
});
