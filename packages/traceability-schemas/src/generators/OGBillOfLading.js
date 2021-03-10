const faker = require('faker');
const _ = require('lodash');
const { getBillOfLading } = require('./BillOfLading');
const { getObservation } = require('./Observation');
const { getPlace } = require('./Place');

faker.seed(22);

const { getProduct } = require('./Product');

const getOGBillOfLading = () => {
  const product = getProduct();
  delete product['@context'];
  product.name = 'Crude Oil Barrel';
  product.description = 'Heavy Sour Dilbit';

  const billOfLading = getBillOfLading();

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
  const valuePerItem = faker.random.number({ min: 100, max: 1000 }).toString();
  const totalOrderValue = (valuePerItem * faker.random.number({ min: 2, max: 5 })).toString();

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'OGBillOfLading',
    billOfLading,
    shippingDate: '2020-03-15',
    arrivalDate: '2020-03-28',
    valuePerItem,
    totalOrderValue,
    freightChargeTerms: 'Freight Prepaid',
    batchNumber: '12345678',
    openingVolume: '123',
    closingVolume: '222',
    observation,
  };
  return example;
};

module.exports = { getOGBillOfLading };
