it.skip("configs should match", async () => {
  const currentConfig = require("./generators/config");

  const {
    buildGeneratorConfigFromFs,
  } = require("./buildGeneratorConfigFromFs");

  const newConfig = buildGeneratorConfigFromFs();
  expect(newConfig).toEqual(currentConfig);
});
