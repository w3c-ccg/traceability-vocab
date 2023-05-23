const Ajv = require('ajv');
const yaml = require('js-yaml');

const ajv = new Ajv({
  strict: false,
  // In order to get strict mode back on, and warnings off,
  // We may need these if statements in the future
  // https://github.com/ajv-validator/ajv/issues/1417#issuecomment-1431435887
});

describe('v2', () => {
  const validate = ajv.compile(
    yaml.load(`
title: Example Title 
description: Example Description
type: object
properties:
  '@context':
    type: array
    readOnly: true
    default:
      - https://www.w3.org/2018/credentials/v2
      - https://w3id.org/traceability/v1
    items:
      - type: string
        const: https://www.w3.org/2018/credentials/v2
    additionalItems:
      type: string
      enum:
        - https://w3id.org/traceability/v1
        - https://w3id.org/vc/status-list/2021/v1
        - https://ref.gs1.org/gs1/vc/licence-context/
        - https://ref.gs1.org/gs1/vc/trade-item-context/
        - https://ref.gs1.org/gs1/vc/declaration-context/
`)
  );

  it('minimal context', async () => {
    const instance1 = {
      '@context': ['https://www.w3.org/2018/credentials/v2'],
    };
    const validation1 = validate(instance1);
    expect(validation1).toBe(true);
  });

  describe('extended contexts', () => {
    describe('valid', () => {
      it('https://w3id.org/traceability/v1', async () => {
        const instance1 = {
          '@context': [
            'https://www.w3.org/2018/credentials/v2',
            'https://w3id.org/traceability/v1',
          ],
        };
        const validation1 = validate(instance1);
        expect(validation1).toBe(true);
      });
      it('https://w3id.org/vc/status-list/2021/v1', async () => {
        const instance1 = {
          '@context': [
            'https://www.w3.org/2018/credentials/v2',
            'https://w3id.org/vc/status-list/2021/v1',
          ],
        };
        const validation1 = validate(instance1);
        expect(validation1).toBe(true);
      });
      it('https://ref.gs1.org/gs1/vc/licence-context/', async () => {
        const instance1 = {
          '@context': [
            'https://www.w3.org/2018/credentials/v2',
            'https://ref.gs1.org/gs1/vc/licence-context/',
          ],
        };
        const validation1 = validate(instance1);
        expect(validation1).toBe(true);
      });
    });
    describe('invalid', () => {
      it('unknown url', async () => {
        const instance1 = {
          '@context': [
            'https://www.w3.org/2018/credentials/v2',
            'https://extension.example/v42', // not in allow list
          ],
        };
        const validation1 = validate(instance1);
        expect(validation1).toBe(false);
      });
      it('unknown object', async () => {
        const instance2 = {
          '@context': [
            'https://www.w3.org/2018/credentials/v2',
            { '@vocab': 'https://extension.example/#' }, // not in allow list
          ],
        };
        const validation2 = validate(instance2);
        expect(validation2).toBe(false);
      });
    });
  });
});
