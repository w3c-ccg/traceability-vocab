const faker = require('faker');
const path = require('path');
const fs = require('fs-extra');
const config = require('../src/generators/config');

console.log('Initializing test vector builder');
faker.seed(42);
const EXAMPLE_COUNT = 3;

console.log('Adding schemas');
const schemas = require('../index.js');

const deleteRandomProperty = (obj) => {
  const mutated = { ...obj };
  const randomProperty = Object.keys(mutated)[
    faker.random.number(Object.keys(mutated).length - 1)
  ];
  delete mutated[randomProperty];
  return mutated;
};

const addRandomProperty = (obj) => {
  let mutated = { ...obj };
  mutated = {
    ...mutated,
    [faker.hacker.noun()]: faker.hacker.verb(),
  };
  return mutated;
};

const deleteRandomNumberProperties = (obj) => {
  let mutated = { ...obj };
  let randomNumberOfPropertiesToDelete = faker.random.number(Object.keys(mutated).length - 1) + 1;
  while (randomNumberOfPropertiesToDelete > 0) {
    mutated = deleteRandomProperty(mutated);
    randomNumberOfPropertiesToDelete -= 1;
  }
  return mutated;
};

const addRandomNumberProperties = (obj) => {
  let mutated = { ...obj };
  let randomNumberOfPropertiesToAdd = faker.random.number(3) + 1;
  while (randomNumberOfPropertiesToAdd > 0) {
    mutated = addRandomProperty(mutated);
    randomNumberOfPropertiesToAdd -= 1;
  }
  return mutated;
};

console.log('Generating good / bad examples');
Object.keys(schemas).forEach((schemaName) => {
  if (process.env.VERBOSE_BUILD) {
    console.log('Generating example for:', schemaName);
  }
  //   const schema = schemas[schemaName];
  const generator = config[schemaName];
  if (generator === undefined) {
    console.warn(`No test fixture generator for ${schemaName}`);
  } else {
    const fixture = { good: [], bad: [] };
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < EXAMPLE_COUNT; i++) {
      const example = generator();
      fixture.good.push(example);
      let badExample = { ...example };
      badExample = deleteRandomNumberProperties(badExample);
      badExample = addRandomNumberProperties(badExample);
      fixture.bad.push(badExample);
    }
    fs.outputFileSync(
      path.resolve(__dirname, `../src/__fixtures__/${schemaName}/good.json`),
      JSON.stringify(fixture.good, null, 2),
    );

    fs.outputFileSync(
      path.resolve(__dirname, `../src/__fixtures__/${schemaName}/bad.json`),
      JSON.stringify(fixture.bad, null, 2),
    );
  }
});

// get the good example we just wrote
console.log('Generating credential request objects');
Object.keys(schemas).forEach((schemaName) => {
  if (process.env.VERBOSE_BUILD) {
    console.log('Generating credentials for:', schemaName);
  }
  const schema = schemas[schemaName];
  const exampleFile = path.resolve(__dirname, `../src/__fixtures__/${schemaName}/good.json`);
  if (!fs.existsSync(exampleFile)) {
    console.warn(`No good example for ${schemaName} to generate credential from`);
  } else {
    try {
      if (process.env.VERBOSE_BUILD) {
        console.log('Generating credential for:', schemaName);
      }
      const good = JSON.parse(
        fs.readFileSync(
          exampleFile,
        ),
      );
      const credTemplate = require('../src/data/vc/vc.json');
      // eslint-disable-next-line prefer-destructuring
      credTemplate.credentialSubject = good[0];

      const vcFile = path.resolve(__dirname, `../src/__fixtures__/${schemaName}/credential.json`);
      // console.log('Writing credential request example to:', vcFile);
      fs.outputFileSync(
        vcFile,
        JSON.stringify(credTemplate, null, 2),
      );
    } catch (credentialError) {
      console.warn('Could not generate credential request for:', schemaName, '\n', credentialError);
      if (process.env.FULL_ERROR_HANDLING) {
        process.exit(1);
      }
    }
  }
});
