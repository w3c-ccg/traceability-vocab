/* eslint-disable no-await-in-loop */

const fs = require('fs');
const { resolve } = require('path');

const main = async () => {
  const path = resolve(
    __dirname,
    '../../../docs/openapi/components/schemas/credentials'
  );

  if (!fs.existsSync(path)) {
    throw new Error('Cannot find credentials directory');
  }

  const files = fs.readdirSync(path);

  for (let i = 0; i < files.length; i += 1) {
    const filename = files[i];
    const file = fs.readFileSync(`${path}/${filename}`, 'utf-8');
    const start = file.indexOf('  {');
    const jsonStr = file.substring(start);
    const example = JSON.parse(jsonStr);
    const vc = example;
    if (vc.proof) {
      delete vc.proof;
    }
    const yml = file.substring(0, start);
    const lines = JSON.stringify(vc, null, 2)
      .split('\n')
      .map((line) => `  ${line}`)
      .join('\n');
    const updatedFile = `${yml}${lines}`;
    fs.writeFileSync(`${path}/${filename}`, updatedFile);
  }
};

console.log('🧪 resign credentials as needed');
main();
