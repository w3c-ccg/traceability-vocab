const { generator, schemas } = require('../data/util/data');

const { faker } = generator;

const ajv = generator.getAjv();
// retain old links:
// https://github.com/w3c-ccg/traceability-vocab/blob/1397920e6e23893577753f7f51e4a9c786a746ee/docs/schemas/BillOfLading.json
// https://github.com/w3c-ccg/traceability-vocab/blob/1397920e6e23893577753f7f51e4a9c786a746ee/docs/credentials/BillOfLadingCredential.json
const getBillOfLading = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'BillOfLading',
    billOfLadingNumber: '991205182',
    relatedDocuments: [
      {
        type: ['Purchase'],
        purchaseOrder: 'PO:33321235',
        invoice: {
          type: 'Invoice',
          identifier: '8019223-135189',
        },
      },
    ],
    freight: {
      type: ['ParcelDelivery'],
      expectedArrival: '2021-02-21',
      specialInstructions: 'Do not expose to elements.',
      consignee: {
        type: 'Organization',
        address: {
          type: ['PostalAddress'],
          organizationName: 'Hodkiewicz, Huels and Schuppe',
          streetAddress: '131 Cynthia Corner',
          addressLocality: 'Port Elvaville',
          addressRegion: 'Massachusetts',
          postalCode: '21281-6812',
          addressCountry: 'Lichtenstein',
        },
      },
      item: [
        {
          type: ['Product', 'BillOfLading'],
          name: 'Rebar',
          description: 'Coiled rebar product.',
          quantity: '1000 units',
          identifier: 'BB12359-1231',
          width: '10ft',
          height: '5ft',
          depth: '25ft',
          weight: '10000 lbs',
          packagingType: 'pallets',
          nmfcFreightClass: '50',
          hazardCode: '09',
        },
      ],
    },
  };
  const validate = ajv.compile(schemas.BillOfLading);
  const validateResult = validate(example);
  if (process.env.VERBOSE_BUILD_GENERAL) {
    console.log('Early Validation results from BillOfLading:', validateResult);
  }
  return example;
};

module.exports = { getBillOfLading };
