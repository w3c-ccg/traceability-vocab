const { getMeasuredProperty } = require("./MeasuredProperty");
const { getMeasuredValue } = require("./MeasuredValue");

const getObservation = () => {
  const prop = getMeasuredProperty();
  const example = {
    "@context": ['https://w3id.org/traceability/v1'],
    property: prop,
    measurement: getMeasuredValue(prop),
  };
  return example;
};

module.exports = { getObservation };
