const faker = require("faker");

const { getMeasuredProperty } = require("./MeasuredProperty");

const getMeasuredValue = (prop = getMeasuredProperty()) => {
  if (prop && prop.inchi) {
    return {
      "@context": ['https://w3id.org/traceability/v1'],
      type: "MeasuredValue",
      value: `${faker.random.number({
        min: 0,
        max: 100,
      })}.${faker.random.number({ min: 0, max: 1000 })}`,
      unitCode: "P1", // or 60????
    };
  }
  if (prop.identifier === "ISO 148" || prop.identifier === "ISO 180") {
    return {
      "@context": ['https://w3id.org/traceability/v1'],
      type: "MeasuredValue",
      value: `${faker.random.number({
        min: 0,
        max: 100,
      })}.${faker.random.number({ min: 0, max: 1000 })}`,
      unitCode: "B13",
    };
  }
  const example = {
    "@context": ['https://w3id.org/traceability/v1'],
    type: "MeasuredValue",
    value: "00.00",
    unitCode: "UNKNOWN", // see also https://github.com/gs1/UnitConverterUNECERec20/blob/master/src/UnitConverterUNECERec20.js
  };
  return example;
};

module.exports = { getMeasuredValue };
