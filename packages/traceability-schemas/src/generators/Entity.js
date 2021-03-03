const faker = require('faker');

const { getPerson } = require('./Person');
const { getOrganization } = require('./Organization');

const getEntity = () => {
  const randomType = faker.random.arrayElement(['person', 'organization']);

  if (randomType === 'person') {
    const prop = getPerson();
    return prop;
  }

  const prop = getOrganization();
  return prop;
};

module.exports = { getEntity };
