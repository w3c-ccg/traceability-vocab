const Ajv = require('ajv')

const schema = require('../../../docs/schemas/PostalAddress.json')
const good = require('../data/PostalAddress/good-postal-address-1.json')
const bad = require('../data/PostalAddress/bad-postal-address-1.json')

let validate;

beforeAll(() => {
    const ajv = new Ajv();
    validate = ajv.compile(schema);
})

it('expect good to pass', () => {
    expect(validate(good)).toBe(true)
})

it('expect bad to fail', () => {
    expect(validate(bad)).toBe(false)
})