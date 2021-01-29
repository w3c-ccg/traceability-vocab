const fs = require('fs');
const path = require('path');
const jsonldChecker = require('jsonld-checker');

const context = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname,
      '../../../../docs/contexts/traceability-v1.jsonld'),
  ).toString(),
);

const {
  classDefinitionToFixtureJson,
} = require('../help');
//const { type } = require('os');

const customDocumentLoader = async (url) => {
  if (url === 'https://w3id.org/traceability/v1') {
    return {
      contextUrl: null,
      document: context,
      documentUrl: url,
    };
  }
  throw new Error(`unsupported private context url: ${url}`);
};

const intermediateJsonFile = path.resolve(
  __dirname,
  '../../../../docs/intermediate.json',
);

const intermediateJson = JSON.parse(
  fs.readFileSync(
    intermediateJsonFile,
  ).toString(),
);
Object.values(intermediateJson).forEach((classDefinition) => {
  if (classDefinition.$id) {
    it(classDefinition.title, async () => {
      //if we're running the build, this process won't find the test-vector   
      //that has yet to be built. So we'll save this test for the actual testing. 
      //This isn't the best way to do it by any means, but it works and can be cleaned up later.
      if (!process.env.BUILD_SPEC) {
        const fixture = classDefinitionToFixtureJson(classDefinition);
        await Promise.all(fixture.good.map(async (goodExample) => {
          let resultOk = {};
          resultOk = await jsonldChecker.check(goodExample, customDocumentLoader);
          //Adding some slightly better error handling
          if (resultOk.error.type !== '') {

            console.log(classDefinition.title);
            console.log(resultOk.error);

          }
          return expect(resultOk.ok).toBe(true);
        }));
      } else {
        // we're building so don't worry about it.
        return true;
      }
    });
  }
});
