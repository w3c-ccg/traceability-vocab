const { getPlace } = require('./Place');
const { getPostalAddress } = require('./PostalAddress');
const { getGeoCoordinates } = require('./GeoCoordinates');
const { getChemicalProperty } = require('./ChemicalProperty');
const { getMechanicalProperty } = require('./MechanicalProperty');
const { getMeasuredProperty } = require('./MeasuredProperty');
const { getMeasuredValue } = require('./MeasuredValue');
const { getObservation } = require('./Observation');
const { getInspectionReport } = require('./InspectionReport');

const generatorConfig = {
  Place: getPlace,
  PostalAddress: getPostalAddress,
  GeoCoordinates: getGeoCoordinates,
  ChemicalProperty: getChemicalProperty,
  MechanicalProperty: getMechanicalProperty,
  MeasuredProperty: getMeasuredProperty,
  MeasuredValue: getMeasuredValue,
  Observation: getObservation,
  InspectionReport: getInspectionReport,
};

module.exports = generatorConfig;
