const fs = require('fs');
const path = require('path');
const Ajv = require('ajv').default;
const schemas = require('../index.js');

console.log('🧪 Setting up fixture validator');

const ajv = new Ajv({
    //    $comment: true,
    //    addUsedSchema: true
});

// add schemas first
console.log('Adding schemas to validator');
Object.keys(schemas).forEach((schemaName) => {
    try {
        const schema = schemas[schemaName];
        ajv.addSchema(schema);
    } catch (schemaError) {
        console.warn('Error adding schema to AJV for:', schemaName);
    }
});

const validationResults = [];

console.log('Now validating schemas');
Object.keys(schemas).forEach((schemaName) => {
    const schema = schemas[schemaName];
    const goodExample = path.resolve(__dirname, `../src/__fixtures__/${schemaName}/good.json`);
    if (fs.existsSync(goodExample)) {
        let warnExists = false;
        try {
            const good = JSON.parse(
                fs.readFileSync(
                    goodExample,
                ),
            );
            if (process.env.VERBOSE_BUILD) {
                console.log('Read good example(s) for:', schemaName);
                // console.log('Dumping stored schema:\n', ajv.getSchema(schema.$id));
            }

            good.forEach((example) => {
                // console.log('Validating:\n', JSON.stringify(example, null, 2));
                const isValid = ajv.validate(
                    {
                        $ref: schema.$id,
                    },
                    example,
                );

                if (!isValid) {
                    if (process.env.VERBOSE_BUILD) {
                        console.warn(`a "good" is not valid according to ${schema.$id}`);
                    }
                    warnExists = true;
                    if (process.env.STRICT_ERROR_HANDLING) {
                        process.exit(1);
                    }
                }

                // todo: make tests fail instead of warn
                // expect(isValid).toBe(true);
            });
        } catch (e) {
            console.warn(`could not load good examples for ${schemaName}, with schema id:`, schema.$id);
            console.warn('thrown error:', e);
            console.warn('ajv errors:', ajv.errors);
            console.log('Dumping schema:\n', JSON.stringify(schema, null, 2), '\n\n');
            if (process.env.FULL_ERROR_HANDLING) {
                process.exit(1);
            }
        }

        try {
            const bad = JSON.parse(
                fs.readFileSync(
                    path.resolve(__dirname, `../src/__fixtures__/${schemaName}/bad.json`),
                ),
            );
            bad.forEach((example) => {
                const isValid = ajv.validate(
                    {
                        $ref: schema.$id,
                    },
                    example,
                );

                if (isValid) {
                    if (process.env.VERBOSE_BUILD) {
                        console.warn(`a "bad" is valid according to ${schema.$id}`);
                    }
                    warnExists = true;
                    if (process.env.STRICT_ERROR_HANDLING) {
                        process.exit(1);
                    }
                }

                // todo: make tests fail instead of warn
                // expect(isValid).toBe(true);
            });
        } catch (e) {
            console.warn(`could not load bad examples for ${schemaName}`);
            warnExists = true;
            if (process.env.FULL_ERROR_HANDLING) {
                process.exit(1);
            }
        }
        if (warnExists) {
            validationResults.push({
                obj: schemaName,
                status: 'FAILED'
            });
        } else {
            validationResults.push({
                obj: schemaName,
                status: 'PASSED'
            });
        }
    } else {
        console.warn('No good example for:', schemaName, ' skipping');
    }
});

console.log('Validation results:\n', validationResults);
