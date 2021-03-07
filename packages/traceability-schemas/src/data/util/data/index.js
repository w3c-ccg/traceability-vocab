class DataGenerator {
    constructor() {
        this.faker = require('faker');
        this.faker.seed(42);
        this.dates = {};
        this.dates.prior = '2020-01-07';
        this.dates.current = '2021-03-09';
        this.dates.future = '2022-05-11';
        this.dates.futureAlt = '2022-07-11';
    }
}
const generator = new DataGenerator();

module.exports = { generator };
