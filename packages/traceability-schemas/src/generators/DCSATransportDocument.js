const { getDCSAShippingInstruction } = require('./DCSAShippingInstruction');
const { getPlace } = require('./Place');

const getDCSATransportDocument = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'DCSATransportDocument',
    transportDocumentReference: 'XMANHR2102045',
    shippingInstruction: {
      '@context': ['https://w3id.org/traceability/v1'],
      type: 'DCSAShippingInstruction',
      carrierBookingReference: 'XMANHR2102045',
      transportDocumentType: 'MBL',
      shipper: {
        type: 'Organization',
        name: 'Xxinau Manufacturing Co. Ltd.',
        description: 'Advanced Production - Delivered',
        address: {
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
      consignee: {
        type: 'Organization',
        name: 'Better Life Tech',
        description: 'Better Lives Products',
        address: {
          type: 'PostalAddress',
          streetAddress: 'Rue de la Poste 272',
          addressLocality: 'Ramegnies-Chin',
          addressRegion: 'Hainaut',
          postalCode: '7520',
          addressCountry: 'BE'
        },
        email: 'procurement@lifetech-example.org',
        phoneNumber: '+32-5555-8495'
      },
      firstNotify: {
        type: 'Organization',
        name: 'Better Life Tech',
        description: 'Better Lives Products',
        address: {
          type: 'PostalAddress',
          streetAddress: 'Rue de la Poste 272',
          addressLocality: 'Ramegnies-Chin',
          addressRegion: 'Hainaut',
          postalCode: '7520',
          addressCountry: 'BE'
        },
        email: 'procurement@lifetech-example.org',
        phoneNumber: '+32-5555-8495'
      },
      consigneesFreightForwarder: {
        type: 'Organization',
        name: 'Intertrans NV [378]',
        address: {
          type: 'PostalAddress',
          streetAddress: 'Belcrownlaan 25 - 3rd floor',
          addressLocality: 'Antwerpen',
          postalCode: 'BE-2100AN',
          addressCountry: 'BE'
        },
        phoneNumber: '+32-3-201.98.10'
      },
      cargoItems: [
        {
          '@context': ['https://w3id.org/traceability/v1'],
          type: 'CargoItem',
          cargoLineItems: [
            {
              '@context': ['https://w3id.org/traceability/v1'],
              type: 'CargoLineItem',
              descriptionOfGoods: 'Rollators',
              shippingMarks: 'ByAcre Age is the new Black'
            },
            {
              '@context': ['https://w3id.org/traceability/v1'],
              type: 'CargoLineItem',
              descriptionOfGoods: 'Rollators Organizer Bags',
              shippingMarks: 'ByAcre Age is the new Black'
            },
            {
              '@context': ['https://w3id.org/traceability/v1'],
              type: 'CargoLineItem',
              descriptionOfGoods: 'Rollators Backrest',
              shippingMarks: 'ByAcre Age is the new Black'
            },
            {
              '@context': ['https://w3id.org/traceability/v1'],
              type: 'CargoLineItem',
              descriptionOfGoods: 'Rollators Cane Holder Bracket',
              shippingMarks: 'ByAcre Age is the new Black'
            },
            {
              '@context': ['https://w3id.org/traceability/v1'],
              type: 'CargoLineItem',
              descriptionOfGoods: 'Rollators Cardboard Box',
              shippingMarks: 'ByAcre Age is the new Black'
            }
          ],
          weight: 1671.90,
          weightUnit: 'KGM',
          volume: 27.230,
          volumeUnit: 'CBM',
          numberOfPackages: 245
        }
      ],
      utilizedTransportEquipments: {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'TransportEquipment',
        equipmentReference: 'YMLU3380910',
        ISOEquipmentCode: '20G1',
        seals: [
          {
            '@context': ['https://w3id.org/traceability/v1'],
            type: 'Seal',
            sealNumber: 'YMAI715692'
          }
        ],
      }
    },
    transports: {
      '@context': ['https://w3id.org/traceability/v1'],
      type: 'Transport',
      loadLocation: {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'Place',
        address: {
          '@context': ['https://w3id.org/traceability/v1'],
          type: 'PostalAddress',
          addressRegion: 'Xiamen',
          addressCountry: 'CN',
        }
      },
      dischargeLocation: {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'Place',
        address: {
          '@context': ['https://w3id.org/traceability/v1'],
          type: 'PostalAddress',
          addressRegion: 'Antwerp',
          addressCountry: 'BE',
        }
      },
      modeOfTransport: 'Vessel',
      carrier: {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'Organization',
        name: 'MULTI CONTAINER LINE',
        address: {
          '@context': ['https://w3id.org/traceability/v1'],
          type: 'PostalAddress',
          organizationName: 'MCL Multi Container Line LTD.',
          streetAddress: 'Rm. 3501, 35/F Manhatten Place, 23 Wang Tai Road',
          addressLocality: 'Kowloon Bay',
          addressRegion: 'Hong Kong',
          addressCountry: 'Hong Kong SAR',
        }
      },
      vesselNumber: 'HMM Algeciras',
      voyageNumber: 'V.0004W'
    }
  };
  return example;
};

module.exports = { getDCSATransportDocument };
