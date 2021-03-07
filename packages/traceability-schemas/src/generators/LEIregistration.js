const faker = require('faker');
const { getLEIauthority } = require('./LEIauthority');

const getLEIregistration = () => {
  const pastDate = '2020-01-01';
  const futureDate = '2021-02-02';

  const getStatus = () => {
    const types = ['REQUESTED', 'CONFIRMED', 'REJECTED', 'IN PROGRESS'];
    return faker.random.arrayElement(types);
  };

  const getCorroborationLevel = () => {
    const types = ['FULLY_CORROBORATED', 'PARTIALLY_CORROBORATED', 'NOT_CORROBORATED'];
    return faker.random.arrayElement(types);
  };

  const valauth = getLEIauthority();
  delete valauth['@context'];
  const valautharray = [];
  valautharray.push(valauth);

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'LEIregistration',
    initialRegistrationDate: pastDate,
    lastUpdateDate: pastDate,
    status: getStatus(),
    nextRenewalDate: futureDate,
    managingLou: faker.random.alpha({ count: 20 }).toUpperCase(),
    validationSources: getCorroborationLevel(),
    validationAuthority: valautharray,
  };
  return example;
};

module.exports = { getLEIregistration };
