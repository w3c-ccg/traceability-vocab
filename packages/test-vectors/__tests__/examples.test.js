const fs = require('fs');
const path = require('path');
const jsonldChecker = require('jsonld-checker');
const context = JSON.parse(
    fs.readFileSync(
        path.resolve(__dirname, 
            '../../../docs/contexts/traceability-v1.jsonld')
            ).toString()
            )
const {
    classDefinitionToFixtureJson
  } = require("../src/help");

const customDocumentLoader = async (url) => {
    if (url === 'https://w3id.org/traceability/v1') {
        return {
        contextUrl: null,
        document: context,
        documentUrl: url,
        };
    }
    throw new Error('unsupported private context url: ' + url);
};

const example = {
  "@context": [
    "https://w3id.org/traceability/v1"
  ],
  "type": "ChemicalProperty",
  "name": "Lutetium",
  "formula": "Lu",
  "inchi": "InChI=1S/Lu",
  "inchikey": "OHSVLFRHMCKCQY-UHFFFAOYSA-N"
}


const intermediateJsonFile = path.resolve(
  __dirname,
  "../../../docs/intermediate.json"
);

const intermediateJson = JSON.parse(
  fs.readFileSync(
  intermediateJsonFile).toString()
)
  

  Object.values(intermediateJson).forEach((classDefinition) => {
    if (classDefinition.$id){
        it(classDefinition.title, async () => {
          const fixture = classDefinitionToFixtureJson(classDefinition);
          await Promise.all(fixture.good.map(async (goodExample) => {
            // console.log(goodExample)
            const resultOk = await jsonldChecker.check(goodExample, customDocumentLoader);
            // console.log(resultOk)
            return expect(resultOk.ok).toBe(true);
          }));
        });
    }
});



