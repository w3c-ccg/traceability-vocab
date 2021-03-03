const fs = require('fs');
const path = require('path');

console.log('🧪 build intermediate json from schemas');

const getIntermediateFromDirectory = require('./getIntermediateFromDirectory');

const intermediateJson = getIntermediateFromDirectory(
  path.resolve(__dirname, '../schemas'),
);

fs.writeFileSync(
  path.resolve(__dirname, '../../../docs/intermediate.json'),
  JSON.stringify(intermediateJson, null, 2),
);
