const faker = require('faker');

faker.seed(42);
const _ = require('lodash');
const { getAgProduct } = require('./AgProduct');
const { getObservation } = require('./Observation');
const { getEntity } = require('./Entity');
const { getPerson } = require('./Person');
const { getPlace } = require('./Place');

const getAgActivity = () => {
  // Get Entity
  const farm = getEntity();
  delete farm['@context'];
  farm.name = "Jimbo's Awesome Farm";
  farm.description = 'Sustainable growth, healthy products';

  const farmer = getPerson();
  farmer.worksFor.name = farm.name;
  const field = getPlace();

  delete farmer['@context'];
  delete field['@context'];

  // get agProducts
  const agProduct = [];
  let numProds = faker.random.number({ min: 1, max: 3 });
  while (numProds > 0) {
    const prod = getAgProduct();
    delete prod['@context'];
    agProduct.push(prod);
    numProds -= 1;
  }

  // observations
  let numSubstances = faker.random.number({ min: 1, max: 4 });
  let observation = [];

  while (numSubstances > 0) {
    const substance = getObservation();
    delete substance['@context'];
    observation.push(substance);
    numSubstances -= 1;
  }

  observation = _.uniq(observation, 'property.name');

  const sum = observation
    .map((r) => (r.property.inchi ? parseFloat(r.measurement.value) : 0))
    .reduce((a, b) => a + b, 0);

  observation = observation.map((r) => {
    const adjusted = `${(
      (100 * parseFloat(r.measurement.value))
      / sum
    ).toPrecision(5)}`;

    return {
      ...r,
      measurement: {
        ...r.measurement,
        value: r.property.inchi ? adjusted : r.measurement.value,
      },
    };
  });
  // End observation data prep

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'AgActivity',
    farm,
    actor: [farmer],
    field,
    activityDate: '2020-02-15',
    activityType: 'spray',
    agProduct,
    observation,
  };
  return example;
};

module.exports = { getAgActivity };
