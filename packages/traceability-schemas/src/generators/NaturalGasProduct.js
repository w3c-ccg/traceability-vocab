const faker = require('faker');
const _ = require('lodash');
const { getObservation } = require('./Observation');
const { getPlace } = require('./Place');

faker.seed(22);

const { getProduct } = require('./Product');

const getNaturalGasProduct = () => {
  const product = getProduct();
  delete product['@context'];
  product.name = 'Natural Gas';
  product.description = 'Natural Gas Stream';

  const facility = getPlace();
  delete facility['@context'];

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

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'NaturalGasProduct',
    HSCode: '270900',
    UWI: '100.12-04-091-05-W5.00',
    productionDate: '2020-03-30',
    facility,
    observation,
    product,
  };
  return example;
};

module.exports = { getNaturalGasProduct };
