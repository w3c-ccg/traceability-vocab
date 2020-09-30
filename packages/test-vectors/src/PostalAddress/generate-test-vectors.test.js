
const faker = require('faker');

const {
    deleteRandomNumberProperties,
    addRandomNumberProperties,
    writeFileToPublic
} = require('../help')

const { FAKER_SEED } = require('../constants');

const fixture = require('../../../../docs/test-vectors/PostalAddress.json')

// deterministic results.
// @see https://www.npmjs.com/package/faker#setting-a-randomness-seed
faker.seed(FAKER_SEED);

let count = 3;

it('should generate test-vectors for PostalAddress', () => {
    const good = [];
    const bad = [];
    for (let i = 0; i < count; i++) {
        const postalAddress = {
            "organizationName": faker.company.companyName(),
            "streetAddress": faker.address.streetAddress(),
            "addressLocality": faker.address.city(),
            "addressRegion": faker.address.state(),
            "postalCode": faker.address.zipCode(),
            "addressCountry": faker.address.country()
        }
        good.push(postalAddress)
        let badExample = { ...postalAddress, }
        badExample = deleteRandomNumberProperties(badExample);
        badExample = addRandomNumberProperties(badExample);
        bad.push(badExample)
    }

    // make sure fixture's only change intentionally
    expect(fixture).toEqual({ good, bad })
    writeFileToPublic('test-vectors/PostalAddress.json', JSON.stringify({ good, bad }, null, 2))
})