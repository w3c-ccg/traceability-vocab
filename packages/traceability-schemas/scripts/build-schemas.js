const fs = require('fs');
const path = require('path');

const buildFixturesFromFs = () => {
  const files = fs.readdirSync(path.resolve(__dirname, '../schemas'));

  const fixtures = {};

  files.forEach((fname) => {
    // eslint-disable-next-line
    const fixture = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, `../schemas/${fname}`).toString()),
    );
    fixtures[fname.replace('.json', '')] = fixture;
  });

  return fixtures;
};

console.log('🧪 build an index.js from a directory of JSON files.');

const map = buildFixturesFromFs();

const requireStatements = Object.keys(map).map((key) => `${key}: require('./schemas/${key}.json'),`);

const indexFile = `
module.exports = {
${requireStatements.join('\n')}
}
`;

const typingsFile = `
export default {
${requireStatements.join('\n')}
}
`;

fs.writeFileSync(path.resolve(__dirname, '../index.js'), indexFile);

fs.writeFileSync(path.resolve(__dirname, '../typings.d.ts'), typingsFile);
