const { generator, schemas } = require('../data/util/data');

const ajv = generator.getAjv();

const { getPostalAddress } = require('./PostalAddress');
const { getOrganization } = require('./Organization');
const { getUsmcaProductSpecifier } = require('./UsmcaProductSpecifier');
const { Organization } = require('../..');

const getUsmcaCertificateOfOrigin = () => {
  const certifierDetails = getOrganization();
  delete certifierDetails['@context'];

  const importerDetails = certifierDetails;

  const exporterDetails = getOrganization();
  delete exporterDetails['@context'];

  const producerDetails = getOrganization();
  delete producerDetails['@context'];

  const usmcaProdSpec = getUsmcaProductSpecifier();
  delete usmcaProdSpec['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'USMCACertificateOfOrigin',
    certifier: 'Importer',
    certifierDetails,
    exporterDetails,
    importerDetails: [importerDetails],
    producerDetails: [producerDetails],
    goods: [usmcaProdSpec],
    blanketPeriodFrom: '2021-06-22',
    blanketPeriodTo: '2022-06-21',
  };
  return example;
};

module.exports = { getUsmcaCertificateOfOrigin };
