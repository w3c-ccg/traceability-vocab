const { getMeasuredProperty } = require("./MeasuredProperty");
const { getMeasuredValue } = require("./MeasuredValue");

const getObservation = () => {
  const property = getMeasuredProperty();
  delete property['@context'];
  
  const measurement = getMeasuredValue(property)
  delete measurement['@context'];
  delete measurement['type'];
  const example = {
    "@context": ['https://w3id.org/traceability/v1'],
    type: "Observation",
    property,
    measurement,
  };
  return example;
};

module.exports = { getObservation };
