/* eslint-disable operator-linebreak */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const getAllJsonFilesFromDirectory = (targetDirectory) => {
  const files = fs
    .readdirSync(targetDirectory)
    .filter((f) => f.indexOf('.json') !== -1);
  return files.map((f) => {
    const c = fs.readFileSync(path.resolve(targetDirectory, f).toString());
    return JSON.parse(c);
  });
};

const updateEmbedding = (obj, key, value) => {
  delete obj[key];
  obj.$linkedData = JSON.parse(value);
};

const cleanObj = (obj) => {
  //   delete obj.$id;
  delete obj.$schema;
  delete obj.examples;
  for (const [key, value] of Object.entries(obj)) {
    if (key === '$comment') {
      updateEmbedding(obj, key, value);
    }
    if (key === '$ref') {
      obj[key] = value
        .replace('https://w3id.org/traceability/schemas/', './')
        .replace('.json', '.yml');
    }
  }
  if (obj.properties) {
    for (const [key2, value2] of Object.entries(obj.properties)) {
      if (key2 === '@context') {
        delete obj.properties['@context'];
      } else if (
        key2 === 'type' &&
        JSON.stringify(value2) ===
          JSON.stringify({ oneOf: [{ type: 'string' }, { type: 'array' }] })
      ) {
        obj.properties.type = { type: 'string', enum: [obj.$linkedData.term] };
      } else {
        cleanObj(obj.properties[key2]);
      }
    }
  }
  if (obj.items) {
    cleanObj(obj.items);
  }
};

const sortObj = (unordered) => {
  const ordered = Object.keys(unordered)
    .sort((a, b) => {
      if (a === 'title') {
        return 1;
      }
      if (a === 'description') {
        return 1;
      }
      if (a === '$linkedData') {
        return -1;
      }
      return 0;
    })
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});

  return ordered;
};

(async () => {
  console.log('converting schemas...');
  const oldSchemas = getAllJsonFilesFromDirectory(
    path.resolve(__dirname, '../schemas')
  );

  const [firstSchema] = oldSchemas;
  const fileName = firstSchema.$id
    .replace('https://w3id.org/traceability/schemas/', '')
    .replace('.json', '.yml');
  delete firstSchema.$id;
  cleanObj(firstSchema);

  const finalSchema = sortObj(firstSchema);

  fs.writeFileSync(
    path.resolve(__dirname, `../temp-out/${fileName}`),
    yaml.dump(finalSchema)
  );
})();
