const faker = require('faker');

faker.seed(42);
const _ = require('lodash');
const { getPlace } = require('./Place');
const { getInspector } = require('./Inspector');
const { getAgParcelDelivery } = require('./AgParcelDelivery');
const { getEntity } = require('./Entity');
const { getObservation } = require('./Observation');

// Include test data for inspection type.
// This data is very rudimentary for now, and it is
// probably overkill to have a separate file, but it might
// be useful in the future across multiple Ag schemas.
const agTypes = require('../../data/generated/AgInspection-types.json');
// Include test data for Ag products.
// const prods = require('../../data/generated/AgProducts.json');

const getAgInspectionReport = () => {
  // get an inspection type
  const randomType = Object.keys(agTypes)[
    faker.random.number(Object.keys(agTypes).length - 1)
  ];
  const inspectionType = agTypes[randomType].name;

  // get a product
  // const randomProd = Object.keys(prods)[
  //   faker.random.number(Object.keys(prods).length - 1)
  // ];

  // const itemShipped = prods[randomProd].Item;

  // Start observation data prep
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

  // pull in outside schemas
  const facility = getPlace();
  delete facility['@context'];
  const inspector = getInspector();
  delete inspector['@context'];
  const shipment = getAgParcelDelivery();
  delete shipment['@context'];
  const applicant = getEntity();
  delete applicant['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'AgInspectionReport',
    facility,
    inspector,
    shipment,
    applicant,
    inspectionDate: '2020-03-15',
    inspectionType,
    observation,
  };
  return example;
};

module.exports = { getAgInspectionReport };
