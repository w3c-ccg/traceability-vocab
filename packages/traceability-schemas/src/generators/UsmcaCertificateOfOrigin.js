const { generator, schemas } = require('../data/util/data');

const ajv = generator.getAjv();

const { getPostalAddress } = require('./PostalAddress');
const { getOrganization } = require('./Organization');
const { getUsmcaProductSpecifier } = require('./UsmcaProductSpecifier');
const { Organization } = require('../..');

const getUsmcaCertificateOfOrigin = () => {
  const certifier = getOrganization();
  delete certifier['@context'];

  const importer = certifier;

  const exporter = getOrganization();
  delete exporter['@context'];

  const producer = getOrganization();
  delete producer['@context'];

  const usmcaProdSpec = getUsmcaProductSpecifier();
  delete usmcaProdSpec['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'USMCACertificateOfOrigin',
    certifier,
    exporter,
    importer,
    producer,
    goods: [usmcaProdSpec],
  };
  return example;
};

module.exports = { getUsmcaCertificateOfOrigin };
