const fs = require('fs');
const path = require('path');

console.log('🧪 build context from intermediate');

const getContextFromIntermediate = require('./getContextFromIntermediate');

const context = getContextFromIntermediate(
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../../docs/intermediate.json')),
  ),
);

fs.writeFileSync(
  path.resolve(__dirname, '../../../docs/contexts/traceability-v1.jsonld'),
  JSON.stringify(context, null, 2),
);
