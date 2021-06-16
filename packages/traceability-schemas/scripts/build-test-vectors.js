const faker = require('faker');
const path = require('path');
const fs = require('fs-extra');
const config = require('../src/generators/config');
const evidencecreds = require('../src/data/vc/includingevidence.json');
const credstatus = require('../src/data/vc/includingcredentialstatus.json');

console.log('🧪 Initializing test vector builder');
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
      JSON.stringify(fixture.good, null, 2)
    );

    fs.outputFileSync(
      path.resolve(__dirname, `../src/__fixtures__/${schemaName}/bad.json`),
      JSON.stringify(fixture.bad, null, 2)
    );
  }
});

// get the good example we just wrote
console.log('Generating credential request objects');
Object.keys(schemas).forEach((schemaName) => {
  if (process.env.VERBOSE_BUILD) {
    console.log('Generating credentials for:', schemaName);
  }
  const exampleFile = path.resolve(
    __dirname,
    `../src/__fixtures__/${schemaName}/good.json`
  );
  if (!fs.existsSync(exampleFile)) {
    console.warn(
      `No good example for ${schemaName} to generate credential from`
    );
  } else {
    try {
      if (process.env.VERBOSE_BUILD) {
        console.log('Generating credential for:', schemaName);
      }
      const good = JSON.parse(fs.readFileSync(exampleFile));
      let credTemplate = require('../src/data/vc/vc.json');
      const Evidence = require('../src/data/vc/evidence.json');
      const Credentialstatus = require('../src/data/vc/credentialstatus.json');
      delete Evidence['@context'];
      // detect if evidence property is to be included
      let loopvar = evidencecreds.included.length;
      let remove = false;
      while (loopvar > 0) {
        if (evidencecreds.included[loopvar - 1] === schemaName) {
          remove = true;
        }
        loopvar -= 1;
      }
      // detect if credentialStatus is to be included
      let loopvar1 = credstatus.included.length;
      let remove1 = false;
      while (loopvar1 > 0) {
        if (credstatus.included[loopvar1 - 1] === schemaName) {
          remove1 = true;
        }
        loopvar1 -= 1;
      }
      // eslint-disable-next-line prefer-destructuring

      // eslint-disable-next-line operator-linebreak
      // Based on remove and remove1 flag determine whether evidence, credentialStatus
      // or both should be included in the credential
      if (!remove && !remove1) {
      delete credTemplate.evidence;
      delete credTemplate.credentialStatus;
      credTemplate = { ...credTemplate, credentialSubject: good[0] };
      } else if (remove && !remove1) {
        delete credTemplate.credentialStatus;
        credTemplate = { ...credTemplate, credentialSubject: good[0], evidence: [Evidence] };
      } else if (!remove && remove1) {
        delete credTemplate.evidence;
        credTemplate = {
 ...credTemplate,
credentialSubject: good[0],
          credentialStatus: Credentialstatus
};
      } else {
        credTemplate = {
 ...credTemplate,
credentialSubject: good[0],
          evidence: [Evidence],
credentialStatus: Credentialstatus
};
      }

      const vcFile = path.resolve(
        __dirname,
        `../src/__fixtures__/${schemaName}/credential.json`
      );
      // console.log('Writing credential request example to:', vcFile);
      fs.outputFileSync(vcFile, JSON.stringify(credTemplate, null, 2));
    } catch (credentialError) {
      console.warn(
        'Could not generate credential request for:',
        schemaName,
        '\n',
        credentialError
      );
      if (process.env.FULL_ERROR_HANDLING) {
        process.exit(1);
      }
    }
  }
});
