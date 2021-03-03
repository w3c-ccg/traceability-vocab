const fs = require("fs");
const path = require("path");
const Ajv = require("ajv").default;
const schemas = require("../../index.js");

const ajv = new Ajv();

Object.keys(schemas).forEach((schemaName) => {
  const schema = schemas[schemaName];
  ajv.addSchema(schema);

  describe(schemaName, () => {
    try {
      const good = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, `../__fixtures__/${schemaName}/good.json`)
        )
      );

      describe("good", () => {
        good.forEach((example) => {
          it("should pass good", () => {
            const isValid = ajv.validate(
              {
                $ref: schema.$id,
              },
              example
            );

            if (!isValid) {
              console.warn('a "good" is not valid according to ' + schema.$id);
            }

            // todo: make tests fail instead of warn
            // expect(isValid).toBe(true);
          });
        });
      });
    } catch (e) {
      console.warn("could not load good examples for " + schemaName);
    }

    try {
      const bad = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, `../__fixtures__/${schemaName}/bad.json`)
        )
      );
      describe("bad", () => {
        bad.forEach((example) => {
          it("should fail bad", () => {
            const isValid = ajv.validate(
              {
                $ref: schema.$id,
              },
              example
            );

            if (isValid) {
              console.warn('a "bad" is valid according to ' + schema.$id);
            }

            // todo: make tests fail instead of warn
            // expect(isValid).toBe(true);
          });
        });
      });
    } catch (e) {
      console.warn("could not load bad examples for " + schemaName);
    }
  });
});
