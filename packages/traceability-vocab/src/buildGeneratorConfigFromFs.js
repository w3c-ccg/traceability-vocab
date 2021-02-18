const fs = require("fs");
const path = require("path");

const buildGeneratorConfigFromFs = () => {
  const files = fs
    .readdirSync(path.resolve(__dirname, "./generators"))
    .filter((fname) => {
      return !fname.includes("test.js") && !fname.includes("config.js");
    });

  const methods = {};

  files.forEach((fname) => {
    const generatorMethods = require("./generators/" + fname);
    methods[fname.replace(".js", "")] =
      generatorMethods["get" + fname.replace(".js", "")];
  });

  return methods;
};

module.exports = { buildGeneratorConfigFromFs };
