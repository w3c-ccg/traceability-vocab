const toOpenApi = require("json-schema-to-openapi-schema");

const openAPISpec = {
  openapi: "3.0.0",
  info: {
    title: "Traceability Vocabulary Specification",
    description:
      "Traceability Schemas in OpenAPI format for use with swagger, " +
      "redoc and similar\n\nDemonstrates how to utilize the schemas over OpenAPI " +
      "as there is not a direct 1:1 translation between OpenAPI and JSON Schema",
    contact: {
      name: "W3C Traceability Vocabulary",
      url: "https://github.com/w3c-ccg/traceability-vocab/issues",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
    version: "0.0.1",
  },
  paths: {},
  components: {
    schemas: {},
  },
};

/* eslint-disable no-param-reassign, func-names, no-restricted-syntax */
const removeComments = function (obj) {
  for (const prop in obj) {
    // definitions and nested refs may also be an issue
    if (prop === "$comment") {
      delete obj[prop];
    } else if (prop === "definitions") {
      delete obj[prop];
    } else if (prop === "$ref" && typeof obj[prop] === "string") {
      // in schema all refs must be resolvable
      if (!obj[prop].startsWith("#/") || !obj[prop].startsWith("https://")) {
        delete obj[prop];
      }
    } else if (typeof obj[prop] === "object") {
      removeComments(obj[prop]);
    }
  }
};

const getOpenApiFromIntermediate = (intermediateJson) => {
  Object.values(intermediateJson).forEach((classDefinition) => {
    try {
      // only if everything validated with no errors should this add to the OpenAPI spec
      try {
        const $classComment = JSON.parse(classDefinition.schema.$comment);

        // json wrapper clones nicely, and makes sure everything parses fine
        const schemaObj = JSON.parse(
          JSON.stringify(toOpenApi(classDefinition.schema))
        );
        removeComments(schemaObj);
        // we can also include all examples at some point in the future should this be needed
        // eslint-disable-next-line prefer-destructuring
        // schemaObj.example = classDefinition.examples[0];
        openAPISpec.components.schemas[$classComment.term] = schemaObj;
        /* eslint-enable no-param-reassign, func-names, no-restricted-syntax */

        openAPISpec.paths[`/${$classComment.term}`] = {
          get: {
            description: $classComment.term,
            responses: {
              200: {
                description:
                  `A list of all ${$classComment.term} objects ` +
                  "from the system that the user has access to",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: `#/components/schemas/${$classComment.term}`,
                      },
                    },
                  },
                },
              },
              500: { description: "Internal Server error" },
            },
          },
        };
      } catch (oe) {
        // eslint-disable-next-line
        console.warn("openapi spec addition error:", classDefinition);
        // eslint-disable-next-line
        console.warn(oe);
      }
    } catch (e) {
      // eslint-disable-next-line
      console.warn("No test vectors for ", classDefinition.title, e);
    }
  });

  return openAPISpec;
};

module.exports = getOpenApiFromIntermediate;
