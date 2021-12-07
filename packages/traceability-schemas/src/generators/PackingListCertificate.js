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
          orderNumber: 'PO00000329',
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
          },
          transportPackages: [
            {
              '@context': ['https://w3id.org/traceability/v1'],
              type: 'Package',
              physicalShippingMarks: 'by ACRE AGE IS THE NEW BLACK',
              itemQuantity: 540,
              perPackageUnitQuantity: 1,
              shippedItems: {
                description: 'Rollators',
                itemCount: 540
              },
              netWeight: 4302,
              grossWeight: 3834,
              weightUnit: 'kg',
              grossVolume: 66.96,
              volumeUnit: 'cbm'
            },
            {
              '@context': ['https://w3id.org/traceability/v1'],
              type: 'Package',
              physicalShippingMarks: 'by ACRE AGE IS THE NEW BLACK',
              itemQuantity: 2,
              perPackageUnitQuantity: 100,
              shippedItems: {
                description: 'Rollator backrest',
                itemCount: 200
              },
              netWeight: 42,
              grossWeight: 44,
              weightUnit: 'kg',
              grossVolume: 0.28,
              volumeUnit: 'cbm'
            },
            {
              '@context': ['https://w3id.org/traceability/v1'],
              type: 'Package',
              physicalShippingMarks: 'by ACRE AGE IS THE NEW BLACK',
              itemQuantity: 80,
              perPackageUnitQuantity: 1,
              shippedItems: {
                description: 'Carton box',
                itemCount: 80
              },
              netWeight: 50,
              grossWeight: 160,
              weightUnit: 'kg',
              grossVolume: 0.5,
              volumeUnit: 'cbm'
            },
          ],
          grossWeight: 4038,
          weightUnit: 'kg',
          grossVolume: 67.74,
          volumeUnit: 'cbm',
          packageQuantity: 622,
          itemQuantity: 820
        }
      ],
    };
  return example;
};

module.exports = { getPackingListCertificate };
