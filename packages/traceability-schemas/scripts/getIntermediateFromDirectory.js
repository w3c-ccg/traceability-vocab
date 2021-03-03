const fs = require('fs');
const path = require('path');

const getAllJsonFilesFromDirectory = (targetDirectory) => {
  const files = fs
    .readdirSync(targetDirectory)
    .filter((f) => f.indexOf('.json') !== -1);
  return files.map((f) => JSON.parse(fs.readFileSync(path.resolve(targetDirectory, f).toString())));
};

const getIntermediateFromDirectory = (targetDirectory) => {
  const intermediate = {};
  const files = getAllJsonFilesFromDirectory(targetDirectory);
  files.forEach((file) => {
    if (file.$comment) {
      const $classComment = JSON.parse(file.$comment);
      if (!intermediate[$classComment['@id']]) {
        intermediate[$classComment['@id']] = {
          $id: file.$id,
          $schema: file.$schema,
          $comment: $classComment,
          title: file.title,
          description: file.description,
          classProperties: {},
          examples: file.examples,
          schema: file,
        };
      }

      if (file.properties) {
        Object.values(file.properties).forEach((prop) => {
          if (prop.$comment) {
            const $propertyComment = JSON.parse(prop.$comment);
            intermediate[$classComment['@id']].classProperties[
              $propertyComment['@id']
            ] = {
              $comment: $propertyComment,
              title: prop.title,
              description: prop.description,
            };
          }
        });
      }
    }
  });
  return intermediate;
};

module.exports = getIntermediateFromDirectory;
