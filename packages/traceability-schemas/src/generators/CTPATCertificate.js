const getCTPATCertificate = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'CTPATCertificate',
    ctpatCertifiedEntity: {
      '@context': ['https://w3id.org/traceability/v1'],
      type: 'Organization',
      name: 'Trans-Atlantic Shipping Co. Ltd.',
      address: {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'PostalAddress',
        organizationName: 'Trans-Atlantic Shipping Co. Ltd.',
        streetAddress: '82 Whitchurch Road',
        addressLocality: 'Elsworth',
        postalCode: 'CB3 8NW',
        addressCountry: 'UK',
      },
    },
  };
  return example;
};

module.exports = { getCTPATCertificate };
