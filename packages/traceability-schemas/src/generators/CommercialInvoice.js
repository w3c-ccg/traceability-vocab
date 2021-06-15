const { generator, schemas } = require('../data/util/data');

const ajv = generator.getAjv();

// retain old link
// https://github.com/w3c-ccg/traceability-vocab/blob/1397920e6e23893577753f7f51e4a9c786a746ee/docs/schemas/CommercialInvoiceCredential.json
// https://github.com/w3c-ccg/traceability-vocab/blob/1397920e6e23893577753f7f51e4a9c786a746ee/docs/credentials/CommercialInvoice.json
const getCommercialInvoice = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: ['CommercialInvoice'],
    portOfEntry: {
      type: 'PostalAddress',
      addressLocality: 'Seatle',
      addressRegion: 'Washington',
      addressCountry: 'USA',
    },
    destinationCountry: 'MEX',
    purchaseDate: '2021-02-21',
    customer: {
      type: ['Organization'],
      address: {
        type: ['PostalAddress'],
        organizationName: 'Generic Motors of America',
        streetAddress: '12 Generic Motors Dr',
        addressLocality: 'Detroit',
        addressRegion: 'Michigain',
        postalCode: '48232-5170',
        addressCountry: 'USA',
      },
    },
    provider: {
      type: ['Organization'],
      address: {
        type: ['PostalAddress'],
        organizationName: 'Aishi Metal Shinzo Co., Ltd.',
        streetAddress: '1651, Shimonakano, Yoshida',
        addressLocality: 'Tsubame-shi',
        addressRegion: 'Niigata-ken',
        postalCode: '959-0215',
        addressCountry: 'Japan',
      },
    },
    totalPaymentDue: {
      type: 'PriceSpecification',
      price: 150000.0,
      priceCurrency: 'USD',
    },
    merchandise: [
      {
        type: 'Product',
        manufacturer: {
          type: 'Organization',
          address: {
            type: 'PostalAddress',
            addressCountry: 'Japan',
          },
        },
        description: 'UNS S30400 chromium-nickel stainless steel rolls.',
        weight: {
          type: ['QuantitativeValue'],
          unitCode: 'lbs',
          value: '10000',
        },
        quantity: 5,
        priceSpecification: {
          type: 'PriceSpecification',
          price: 10000.0,
          priceCurrency: 'USD',
        },
      },
      {
        type: 'Product',
        manufacturer: {
          type: 'Organization',
          address: {
            type: 'PostalAddress',
            addressCountry: 'Japan',
          },
        },
        description:
          'Galvalannealed ASTM A-653 zinc-iron alloy-coated steel sheets.',
        weight: {
          type: ['QuantitativeValue'],
          unitCode: 'lbs',
          value: '20000',
        },
        quantity: 10,
        priceSpecification: {
          type: 'PriceSpecification',
          price: 10000.0,
          priceCurrency: 'USD',
        },
      },
    ],
  };
  const validate = ajv.compile(schemas.CommercialInvoice);
  const validateResult = validate(example);
  if (process.env.VERBOSE_BUILD_GENERAL) {
    console.log(
      'Early Validation results from CommercialInvoice:',
      validateResult
    );
  }
  return example;
};

module.exports = { getCommercialInvoice };
