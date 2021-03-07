const Ajv = require('ajv').default;
const schemas = require('../../../../index.js');

class DataGenerator {
    constructor() {
        this.faker = require('faker');
        this.faker.seed(42);
        this.dates = {};
        this.dates.prior = '2020-01-07';
        this.dates.current = '2021-03-09';
        this.dates.future = '2022-05-11';
        this.dates.futureAlt = '2022-07-11';

        // let's build up a reference ajv set so we can generate data correctly
        // note - you will error badly if you leverage this inappropriately
        this.ajv = new Ajv({
            addUsedSchema: true,
            removeAdditional: true,
            coerceTypes: 'array',
            allErrors: true,
            verbose: true,
            logger: {
                log: console.log.bind(console),
                warn: console.log.bind(console),
                error: console.log.bind(console),
            }
        });
        Object.keys(schemas).forEach((schemaName) => {
            try {
                const schema = schemas[schemaName];
                this.ajv.addSchema(schema);
            } catch (schemaError) {
                // silently do nothing most of the time
                if (process.env.VERBOSE_BUILD) {
                    console.warn('Warning or Error encountered adding schema to generators:', schemaError);
                }
            }
        });
    }

    getAjv() {
        return this.ajv;
    }
}
const generator = new DataGenerator();

module.exports = { generator, schemas };
