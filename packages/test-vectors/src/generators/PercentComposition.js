const faker = require('faker');

const PercentComposition = require('../../../../docs/schemas/PercentComposition.json')

const getPercentComposition = () => {

    let numberElements = faker.random.number({ min: 1, max: 5 })

    let example = {};
    while (numberElements > 0) {
        let randomProperty = Object.keys(PercentComposition.properties)[faker.random.number(Object.keys(PercentComposition.properties).length - 1)]

        let randomPercent = `${faker.random.number({ min: 0, max: 100 }).toString()}.${faker.random.number({ min: 0, max: 100 }).toString()}`

        example = {
            ...example,
            [randomProperty]: randomPercent
        }
        numberElements -= 1;
    }

    return example;
}

module.exports = { getPercentComposition }