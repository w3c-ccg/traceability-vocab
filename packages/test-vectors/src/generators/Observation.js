const { getMeasuredProperty } = require("./MeasuredProperty");
const { getMeasuredValue } = require("./MeasuredValue");

const getObservation = () => {
  const prop = getMeasuredProperty();
  const example = {
    property: prop,
    measurement: getMeasuredValue(prop),
  };
  return example;
};

module.exports = { getObservation };
