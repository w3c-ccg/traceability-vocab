const fs = require("fs");
const path = require("path");

console.log("🧪 build vocab from intermediate");

const getVocabFromIntermediate = require("./getVocabFromIntermediate");

const vocab = getVocabFromIntermediate(
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../../../docs/intermediate.json"))
  )
);

fs.writeFileSync(
  path.resolve(__dirname, "../../../docs/sections/vocab.html"),
  vocab
);
