const { generator, schemas } = require('../data/util/data');

const ajv = generator.getAjv();

const { getOrganization } = require('./Organization');
const { getCommercialInvoice } = require('./CommercialInvoice');

const getCommercialInvoiceCertificate = () => {
  const manufacturer = getOrganization();
  delete manufacturer['@context'];

  const subject = getCommercialInvoice();
  delete subject['@context'];

  // Retain old version link:
  // https://github.com/w3c-ccg/traceability-vocab/blob/1397920e6e23893577753f7f51e4a9c786a746ee/docs/credentials/CertifidMillTestReportCredential.json
  const example = {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://w3id.org/traceability/v1',
    ],
    id: 'https://example.com/credential/123',
    type: ['VerifiableCredential', 'CommercialInvoiceCertificate'],
    name: 'Commercial Invoice Certificate',
    description:
      'This document includes recommended commercial invoice fields.',
    relatedLink: [
      {
        type: 'LinkRole',
        target: 'https://www.example.com/template/123',
        linkRelationship: 'templateLink',
      },
      {
        type: 'LinkRole',
        target: 'did:example:789',
        linkRelationship: 'billOfLadingLink',
      },
      {
        type: 'LinkRole',
        target: 'https://www.example.com/credentials/123',
        linkRelationship: 'millTestReportLink',
      },
    ],
    issuanceDate: '2019-12-11T03:50:55Z',
    issuer: {
      id: 'did:example:123',
      ...manufacturer,
    },
    credentialSubject: subject,
  };

  const validate = ajv.compile(schemas.CommercialInvoiceCertificate);
  const validateResult = validate(example);
  if (process.env.VERBOSE_BUILD_STEEL) {
    console.log(
      'Early Validation results from CommercialInvoiceCertificate:',
      validateResult
    );
  }
  return example;
};

module.exports = { getCommercialInvoiceCertificate };
