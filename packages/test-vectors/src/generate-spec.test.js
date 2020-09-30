const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const moment = require('moment');
const { getIntermediateFromDirectory, getContextFromIntermediate } = require('./help');
const UPDATE_RESPEC_TEST_REPORT = 'YES';

const specFile = path.resolve(__dirname, '../../../docs/index.html');
const vocabularyFile = path.resolve(__dirname, '../../../docs/contexts/traceability-v1.jsonld')
const intermediateJsonFile = path.resolve(__dirname, '../../../docs/intermediate.json')

let intermediateJson;
let vocabularyContext;
let updatedSpec;
it('should generate context from json schema', async () => {
    intermediateJson = getIntermediateFromDirectory(path.resolve(__dirname, '../../../docs/schemas'))
    vocabularyContext = getContextFromIntermediate(intermediateJson)
});

it('should update respec', async () => {
    const spec = fs.readFileSync(specFile).toString();
    const $ = cheerio.load(spec);

    $('#intermediate-json').replaceWith(
        `<script type="application/json" id="intermediate-json">
      ${JSON.stringify(intermediateJson, null, 2)}
            </script>`
    );

    $('#vocab-last-generated').replaceWith(
        `<p id="vocab-last-generated" class="note">
      This vocabulary was last generated
      <span id="vocab-last-generated-date">
      ${moment().format('LLLL')}
      </span>
            </p>`
    );

    updatedSpec = $.html();

});


it('should write changes to disk', async () => {
    if (UPDATE_RESPEC_TEST_REPORT === 'YES' && vocabularyContext) {
        fs.writeFileSync(intermediateJsonFile, JSON.stringify(intermediateJson, null, 2));
        fs.writeFileSync(vocabularyFile, JSON.stringify(vocabularyContext, null, 2));
        fs.writeFileSync(specFile, updatedSpec);
    }
});

