const { getMeasuredProperty } = require('./MeasuredProperty');
const { getMeasuredValue } = require('./MeasuredValue');

const getObservation = () => {
  const property = getMeasuredProperty();
  delete property['@context'];

  const measurement = getMeasuredValue(property);
  delete measurement['@context'];

  const date = '2019-12-11T03:50:55Z';

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'Observation',
    date,
    property,
    measurement,
  };
  return example;
};

module.exports = { getObservation };
