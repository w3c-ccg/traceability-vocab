const fs = require('fs');
const path = require('path');

const buildGeneratorConfigFromFs = () => {
  const files = fs
    .readdirSync(path.resolve(__dirname, './generators'))
    .filter(
      (fname) => !fname.includes('test.js') && !fname.includes('config.js'),
    );

  const methods = {};

  files.forEach((fname) => {
    // eslint-disable-next-line
    const generatorMethods = require(`./generators/${fname}`);
    methods[fname.replace('.js', '')] = generatorMethods[`get${fname.replace('.js', '')}`];
  });

  return methods;
};

module.exports = { buildGeneratorConfigFromFs };
