const getPackingListCertificate = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'PackingListCertificate',
    deliveryAddress: {
      '@context': ['https://w3id.org/traceability/v1'],
      type: 'PostalAddress',
      streetAddress: 'IC. Modewegs Vej 1',
      addressLocality: 'Kgs. Lyngby',
      postalCode: '2800',
      addressCountry: 'DK'
    },
    provider: {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'Organization',
        name: 'Xxinau Manufacturing Co. Ltd.',
        description: 'Advanced Production - Delivered',
        address: {
          '@context': ['https://w3id.org/traceability/v1'],
          type: 'PostalAddress',
          streetAddress: 'Xin Fei Da Dao 139',
          addressLocality: 'Xindao',
          addressRegion: 'Fujian Province',
          postalCode: '361100',
          addressCountry: 'CN'
        },
        email: 'xxinau-sales@example.org',
        phoneNumber: '+86-555-865-8495'
      },
      originAddress: {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'PostalAddress',
        streetAddress: 'Xin Fei Da Dao 139',
        addressLocality: 'Xindao',
        addressRegion: 'Fujian Province',
        postalCode: '361100',
        addressCountry: 'CN'
      },
      partOfOrder: [
        {
          orderNumber: "PO00000329",
          manufacturer: {
            '@context': ['https://w3id.org/traceability/v1'],
            type: 'Organization',
            name: 'Xxinau Manufacturing Co. Ltd.',
            description: 'Advanced Production - Delivered',
            address: {
              '@context': ['https://w3id.org/traceability/v1'],
              type: 'PostalAddress',
              streetAddress: 'Xin Fei Da Dao 139',
              addressLocality: 'Xindao',
              addressRegion: 'Fujian Province',
              postalCode: '361100',
              addressCountry: 'CN'
            },
            email: 'xxinau-sales@example.org',
            phoneNumber: '+86-555-865-8495'
          }
          itemsShipped: [
            {

            },
          ]
        }
      ],
    };
  return example;
};

module.exports = { getPackingListCertificate };
