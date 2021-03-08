const fs = require('fs');
const path = require('path');
const beautifyHtml = require('js-beautify').html;

console.log('🧪 build vocab from intermediate');

const getVocabFromIntermediate = require('./getVocabFromIntermediate');

const vocab = getVocabFromIntermediate(
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../../docs/intermediate.json')),
  ),
);

const prettyVocab = beautifyHtml(vocab);

fs.writeFileSync(
  path.resolve(__dirname, '../../../docs/sections/vocab.html'),
  prettyVocab,
);
