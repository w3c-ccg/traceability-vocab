const faker = require('faker');
const config = require('./config');
const { FAKER_SEED, EXAMPLE_COUNT } = require('../constants');

const help = require('../help');

// deterministic results.
// @see https://www.npmjs.com/package/faker#setting-a-randomness-

faker.seed(FAKER_SEED);

const fixtures = require('../__fixtures__');

Object.keys(config).forEach((classDef) => {
  describe(classDef, () => {
    it('should generate fixture', () => {
      const fixture = { good: [], bad: [] };
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < EXAMPLE_COUNT; i++) {
        const example = config[classDef]();
        fixture.good.push(example);
        let badExample = { ...example };
        badExample = help.deleteRandomNumberProperties(badExample);
        badExample = help.addRandomNumberProperties(badExample);
        fixture.bad.push(badExample);
      }
      // Check if a spec build is being run using the env variable set in the package.json
      if (!process.env.BUILD_SPEC) {
        expect(fixture).toEqual(fixtures[classDef]);
      }
      help.writeFileToPublic(
        `test-vectors/${classDef}.json`,
        JSON.stringify(fixture, null, 2),
      );
    });
  });
});
