/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const specPath = path.resolve(__dirname, '../../../docs/openapi/openapi.yml');

const apiSpec = yaml.load(fs.readFileSync(specPath, { encoding: 'utf-8' }));

const ignoreTags = ['Contexts'];

const ignoreEndpoint = (endpoint) => {
  let include = true;
  endpoint.get.tags.forEach((t) => {
    if (ignoreTags.includes(t)) {
      include = false;
    }
  });
  return include;
};

// const schemasFromSpec: any = Object.entries(apiSpec.components.schemas).map(
//   ([key, value]: [string, any]) => {
//     const $id = `#/components/schemas/${key}`;

//     // OAS 3.0 supports relative refs
//     // this code block handles loading them so they can be accesses consistently by $id.
//     let schema = value;
//     if (schema.$ref && schema.$ref.startsWith('./schemas/')) {
//       schema = yaml.load(
//         fs
//           .readFileSync(
//             path.join(specPath.replace('/openapi.yaml', ''), schema.$ref),
//             { encoding: 'utf-8' }
//           )
//           .toString()
//           .replace(/\.\/([A-z-0-9]+)\.yml/g, `#/components/schemas/$1`)
//       );
//     }
//     return {
//       $id,
//       ...schema,
//     };
//   }
// );

const extractSchemaFromEndpoint = (endpoint) => {
  try {
    const { $ref } =
      endpoint.get.responses['200'].content['application/yml'].schema;
    let schema = fs.readFileSync(
      path.join(specPath.replace('/openapi.yml', ''), $ref),
      { encoding: 'utf-8' }
    );
    schema = yaml.load(schema);
    schema.$id = $ref.replace('./', '/openapi/');
    return schema;
  } catch (e) {
    console.error(endpoint, e);
  }
  return null;
};

const schemas = Object.values(apiSpec.paths)
  .filter(ignoreEndpoint)
  .map(extractSchemaFromEndpoint)
  .filter((s) => !!s); // remove nulls

module.exports = { schemas };
