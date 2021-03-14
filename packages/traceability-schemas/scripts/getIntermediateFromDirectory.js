const fs = require('fs');
const path = require('path');

const jsonldSchema = require('@transmute/jsonld-schema');

const getAllJsonFilesFromDirectory = (targetDirectory) => {
  const files = fs
    .readdirSync(targetDirectory)
    .filter((f) => f.indexOf('.json') !== -1);
  return files.map((f) => {
    const c = fs.readFileSync(path.resolve(targetDirectory, f).toString());
    return JSON.parse(c);
  });
};

const getIntermediateFromDirectory = (targetDirectory) => {
  const files = getAllJsonFilesFromDirectory(targetDirectory);
  return jsonldSchema.schemasToIntermediate(files);
};

module.exports = getIntermediateFromDirectory;
