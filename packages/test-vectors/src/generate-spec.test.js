const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const cheerio = require('cheerio');
const moment = require('moment');
const toOpenApi = require('json-schema-to-openapi-schema');
const {
  classDefinitionToFixtureJson,
  getIntermediateFromDirectory,
  getContextFromIntermediate,
} = require('./help');

const openAPISpec = {
  openapi: '3.0.0',
  info: {
    title: 'Traceability Vocabulary Specification',
    description: "Traceability Schemas in OpenAPI format for use with swagger, " +
      "redoc and similar\n\nDemonstrates how to utilize the schemas over OpenAPI " +
      "as there is not a direct 1:1 translation between OpenAPI and JSON Schema",
    contact: {
      name: 'W3C Traceability Vocabulary',
      url: 'https://github.com/w3c-ccg/traceability-vocab/issues',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
    version: '0.0.1',
  },
  paths: {},
  components: {
    schemas: {},
  },
};

const UPDATE_RESPEC_TEST_REPORT = 'YES';

const specFile = path.resolve(__dirname, '../../../docs/index.html');
const openAPISpecFile = path.resolve(__dirname, '../../../docs/traceability-openapi-v1.json');
const vocabularyFile = path.resolve(
  __dirname,
  '../../../docs/contexts/traceability-v1.jsonld',
);
const intermediateJsonFile = path.resolve(
  __dirname,
  '../../../docs/intermediate.json',
);

const ajv = new Ajv();

let intermediateJson;
let vocabularyContext;
let updatedSpec;

it('should generate context from json schema', async () => {
  intermediateJson = getIntermediateFromDirectory(
    path.resolve(__dirname, '../../../docs/schemas'),
  );
  vocabularyContext = getContextFromIntermediate(intermediateJson);
});

it('should add all schemas to ajv', () => {
  Object.values(intermediateJson).forEach((classDefinition) => {
    ajv.addSchema(classDefinition.schema);
  });
});

it('should validate using json schema', async () => {
  Object.values(intermediateJson).forEach((classDefinition) => {
    try {
      const fixture = classDefinitionToFixtureJson(classDefinition);
      const validate = ajv.compile(classDefinition.schema);
      fixture.good.forEach((goodExample) => {
        const valid = validate(goodExample);

        // eslint-disable-next-line no-console
        if (!valid) console.log(validate.errors);
        expect(valid).toBe(true);
      });

      fixture.bad.forEach((badExample) => {
        const valid = validate(badExample);
        expect(valid).toBe(false);
      });

      // eslint-disable-next-line no-param-reassign
      classDefinition.examples = fixture.good;

      // only if everything validated with no errors should this add to the OpenAPI spec
      try {
        const $classComment = JSON.parse(classDefinition.schema.$comment);
        openAPISpec.components.schemas[$classComment.term] = toOpenApi(classDefinition.schema);
        openAPISpec.paths[`/${$classComment.term}`] = {
          get: {
            description: $classComment.term,
            responses: {
              200: {
                description: `A list of all ${$classComment.term} objects `
                    + 'from the system that the user has access to',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: `#/components/schemas/${$classComment.term}`,
                      },
                    },
                  },
                },
              },
              500: 'Internal Server error',
            },
          },
        };
        delete openAPISpec.components.schemas[$classComment.term].$comment;
      } catch (oe) {
        // eslint-disable-next-line
        console.warn('openapi spec addition error:', classDefinition);
        // eslint-disable-next-line
        console.warn(oe);
      }
    } catch (e) {
      // eslint-disable-next-line
      console.warn('error');
      // eslint-disable-next-line
      console.warn(e);
      // eslint-disable-next-line
      console.warn('No test vectors for ', classDefinition.title);
    }
  });
});

it('should update respec', async () => {
  const spec = fs.readFileSync(specFile).toString();
  const $ = cheerio.load(spec);

  $('#intermediate-json').replaceWith(
    `<script type="application/json" id="intermediate-json">
      ${JSON.stringify(intermediateJson, null, 2)}
            </script>`,
  );

  $('#vocab-last-generated').replaceWith(
    `<p id="vocab-last-generated" class="note">
      This vocabulary was last generated
      <span id="vocab-last-generated-date">
      ${moment().format('LLLL')}
      </span>
            </p>`,
  );

  updatedSpec = $.html();
});

it('should write changes to disk', async () => {
  if (UPDATE_RESPEC_TEST_REPORT === 'YES' && vocabularyContext) {
    fs.writeFileSync(
      intermediateJsonFile,
      JSON.stringify(intermediateJson, null, 2),
    );
    fs.writeFileSync(
      vocabularyFile,
      JSON.stringify(vocabularyContext, null, 2),
    );
    fs.writeFileSync(specFile, updatedSpec);
    fs.writeFileSync(openAPISpecFile, JSON.stringify(openAPISpec, null, 2));
  }
});
