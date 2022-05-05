const fs = require('fs');
const yaml = require('js-yaml');

const updateEntity = (schema) => {
  const { example, doc } = schema;
  const { properties } = doc;
  console.log(properties);
  const keys = Object.keys(properties);
  console.log(keys);
  keys.forEach((key) => {
    const prop = properties[key];
    const str = JSON.stringify(prop);
    if (str.indexOf('EntityCompat') === -1) {
      return;
    }
    console.log('---- %s has Entity Compat ---', key);
    console.log(prop);
    console.log(example[key]);
  });
  console.log(schema.file);
};

const main = async () => {
  const relativePath = '../../../docs/openapi/components/schemas/common';
  const files = fs.readdirSync(relativePath);

  const schemas = files.map((file) => {
    const filepath = `${relativePath}/${file}`;
    const content = fs.readFileSync(filepath, 'utf-8');
    let doc;
    let example;

    try {
      doc = yaml.load(content);
    } catch (err) {
      console.log('----- Could not load: %s -----', file);
      throw err;
    }

    try {
      example = JSON.parse(doc.example);
    } catch (err) {
      console.log('----- Could not parse: %s -----', file);
      console.log(doc.example);
      throw err;
    }

    return {
      file,
      filepath,
      content,
      doc,
      example,
      hasEntity: content.indexOf('EntityCompat') !== -1,
    };
  });

  const firstPass = schemas.filter((schema) => schema.hasEntity);
  const baseFiles = firstPass.map((schema) => schema.file);
  const found = [];
  console.log(baseFiles);

  firstPass.forEach((schema) => {
    const { file, content } = schema;
    // We need to see if this file references another file that uses entity

    for (let i = 0; i < baseFiles.length; i += 1) {
      const ref = baseFiles[i];
      if (ref === file) {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (content.indexOf(`./${ref}`) === -1) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (found.indexOf(ref) !== -1) {
        // eslint-disable-next-line no-continue
        continue;
      }
      found.push(ref);
    }
  });

  const atoms = baseFiles.filter((x) => !found.includes(x));
  console.log('--- Not Included by other schemas ---');
  console.log(atoms);

  console.log(firstPass.length);
  console.log(schemas.length);

  const fruit = firstPass.filter((schema) => atoms.indexOf(schema.file) !== -1);
  updateEntity(fruit[0]);
  console.log(fruit.length);

  // First Pass
  // await Promise.all();
};

main();
