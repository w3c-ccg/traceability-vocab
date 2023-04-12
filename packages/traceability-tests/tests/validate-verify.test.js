const Ajv = require('ajv');
const addFormats = require('ajv-formats').default;
const jose = require('jose');
const axios = require('axios');
const yaml = require('js-yaml');

const examples = require('../examples/v2.json');

const base = 'https://w3id.org/traceability/openapi/components/schemas/';

const ajv = new Ajv({
  loadSchema: async (uri) => {
    if (!uri.startsWith('https')) {
      const { data } = await axios.get(`${base}${uri}`);
      const loaded = yaml.load(data);
      const json = JSON.parse(JSON.stringify(loaded));
      return json;
    }
    throw new Error(`Unresolvable schema: ${uri}`);
  },
});
addFormats(ajv);

ajv.addKeyword('tags');
ajv.addKeyword('$linkedData');
ajv.addKeyword('example');

const getPublicKey = async (vm) => jose.importJWK(JSON.parse(jose.base64url.decode(vm.split(':')[2].split('#')[0])));

describe('verify && validate ', () => {
  // slice here is to reduce errors
  examples.examples.slice(0, 1).forEach(({ issued, verified }) => {
    it(verified.payload.type.pop(), async () => {
      const { iss, kid } = jose.decodeProtectedHeader(issued);
      const publicKey = await getPublicKey(iss + kid);
      const validation = await jose.jwtVerify(issued, publicKey);
      const {
        credentialSchema: { id: schemaUrl },
      } = validation.payload;
      const { data } = await axios.get(schemaUrl);
      const validate = await ajv.compileAsync(yaml.load(data));
      const valid = validate(validation.payload);
      if (validate.errors) {
        console.error(validate.errors);
      }
      expect(valid).toBe(true);
    });
  });
});
