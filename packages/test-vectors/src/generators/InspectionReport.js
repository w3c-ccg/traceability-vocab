const faker = require("faker");
const _ = require("lodash");
const { getObservation } = require("./Observation");

const getInspectionReport = () => {
  let numSubstances = faker.random.number({ min: 1, max: 10 });
  let observation = [];

  while (numSubstances > 0) {
    const substance = getObservation();
    observation.push(substance);
    numSubstances -= 1;
  }

  observation = _.uniq(observation, "measuredProperty.name");

  let sum = observation
    .map((r) => {
      return r.measuredProperty.inchi ? parseFloat(r.measuredValue.value) : 0;
    })
    .reduce(function (a, b) {
      return a + b;
    }, 0);

  observation = observation.map((r) => {
    let adjusted = `${(
      (100 * parseFloat(r.measuredValue.value)) /
      sum
    ).toPrecision(5)}`;

    return {
      ...r,
      measuredValue: {
        ...r.measuredValue,
        value: r.measuredProperty.inchi ? adjusted : r.measuredValue.value,
      },
    };
  });

  const example = {
    observation,
  };
  return example;
};

module.exports = { getInspectionReport };
