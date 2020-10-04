const { getMeasuredProperty } = require("./MeasuredProperty");
const { getMeasuredValue } = require("./MeasuredValue");

const getObservation = () => {
  const prop = getMeasuredProperty();
  const example = {
    measuredProperty: prop,
    measuredValue: getMeasuredValue(prop),
  };
  return example;
};

module.exports = { getObservation };
