const fs = require('fs');
const path = require('path');
const Ajv = require('ajv').default;
const schemas = require('../../index.js');

const ajv = new Ajv({});

describe('Adding any local root schema(s) to AJV first', () => {
  // ajv will bomb if referencing http://json-schema.org/draft-07/ via https fyi
});

const validationResults = [];
describe('Adding Schemas to AJV', () => {
  Object.keys(schemas).forEach((schemaName) => {
    const schema = schemas[schemaName];
    // work around an issue with validation against https for ajv
    schema.$schema = schema.$schema.replace('https://', 'http://');
    ajv.addSchema(schema);
  });
});

console.log('Now validating schemas');
Object.keys(schemas).forEach((schemaName) => {
  describe('Fixture Checks', () => {
    let errorEncounter = false;
    const schema = schemas[schemaName];
    const goodExample = path.resolve(__dirname, `../src/__fixtures__/${schemaName}/good.json`);
    const badExample = path.resolve(__dirname, `../src/__fixtures__/${schemaName}/bad.json`);
    const vcReq = path.resolve(__dirname, `../src/__fixtures__/${schemaName}/vc_request.json`);
    const vc = path.resolve(__dirname, `../src/__fixtures__/${schemaName}/vc.json`);
    try {
      let fileMissing = false;

      it(`${schemaName} has good schema`, () => {
        expect(ajv.validateSchema(schema)).toBe(true);
      });

      it(`${schemaName} has good example`, () => {
        if (!fs.existsSync(goodExample)) {
          fileMissing = true;
        }
      });
      it(`${schemaName} has bad example`, () => {
        if (!fs.existsSync(badExample)) {
          fileMissing = true;
        }
      });
      it(`${schemaName} has a vc request example`, () => {
        if (!fs.existsSync(vcReq)) {
          fileMissing = true;
        }
      });
      it(`${schemaName} has a vc example`, () => {
        if (!fs.existsSync(vc)) {
          fileMissing = true;
        }
      });
      if (fileMissing) {
        // this should be ultimately a fail
        console.warn('Incomplete assets for:', schemaName);
        expect(fileMissing).toBe(false);
      }
    } catch (error) {
      // this should also fail
      console.error('Incomplete assets for:', schemaName, 'Likely schema error', error);
      errorEncounter = true;
    }
    expect(errorEncounter).toBe(false);
  });
});

describe('Schema Check', () => {
  expect(ajv.errors).toBe(null);
});
