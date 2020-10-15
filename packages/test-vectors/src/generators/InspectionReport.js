const faker = require("faker");
const _ = require("lodash");
const { getObservation } = require("./Observation");

const getInspectionReport = () => {
  let numSubstances = faker.random.number({ min: 1, max: 10 });
  let observation = [];

  while (numSubstances > 0) {
    const substance = getObservation();
    delete substance['@context'];
    observation.push(substance);
    numSubstances -= 1;
  }

  observation = _.uniq(observation, "property.name");

  let sum = observation
    .map((r) => {
      return r.property.inchi ? parseFloat(r.measurement.value) : 0;
    })
    .reduce(function (a, b) {
      return a + b;
    }, 0);

  observation = observation.map((r) => {
    let adjusted = `${(
      (100 * parseFloat(r.measurement.value)) /
      sum
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
    "@context": ['https://w3id.org/traceability/v1'],
    "type": "InspectionReport",
    observation,
  };
  return example;
};

module.exports = { getInspectionReport };
