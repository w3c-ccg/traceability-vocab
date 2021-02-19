const fs = require('fs');
const path = require('path');

const buildFixturesFromFs = () => {
  const files = fs.readdirSync(
    path.resolve(__dirname, '../../../../docs/test-vectors'),
  );

  const fixtures = {};

  files.forEach((fname) => {
    // eslint-disable-next-line
    const fixture = JSON.parse(
      fs.readFileSync(
        path
          .resolve(__dirname, `../../../../docs/test-vectors/${fname}`)
          .toString(),
      ),
    );
    fixtures[fname.replace('.json', '')] = fixture;
  });

  return fixtures;
};

module.exports = { buildFixturesFromFs };
