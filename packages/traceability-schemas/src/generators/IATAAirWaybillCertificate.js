const { getPlace } = require('./Place');

const getIATAAirWaybillCertificate = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'AirWaybillCertificate',
    airWaybillNumber: 'AXM121102183',
    airlineCodeNumber: '172',
    serialNumber: '48835010',
    airportOfDeparture: {
      '@context': ['https://w3id.org/traceability/v1'],
      type: 'Place',
      iataAirportCode: 'XMN',
      address: {
        type: 'PostalAddress',
        addressLocality: 'Xiamen',
      },
      carrier: {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'Organization',
        name: 'On Time Express Limited',
        address: {
          type: 'PostalAddress',
          streetAddress: 'Suite 605, 6/F, Hai Tian Logistics Centre, #1 Hai Tian Road',
          addressLocality: 'Hu-Li District',
          addressRegion: 'Xiamen',
          addressCountry: 'CN',
        },
      },
      conditionsOfContract:
        "It is agreed that the goods described herein are accepted in apparent good order and condition (except as noted) for carriage SUBJECT TO THE CONDITIONS OF CONTRACT ON THE REVERSE HEREOF. ALL GOODS MAY BE CARRIED BY ANY OTHER MEANS INCLUDING ROAD OR ANY OTHER CARRIER UNLESS SPECIFIC CONTRARY INSTRUCTIONS ARE GIVEN HEREON BY THE SHIPPER, AND SHIPPER AGREES THAT THE SHIPMENT MAY BE CARRIED VIA INTERMEDIATE STOPPING PLACES WHICH THE CARRIER DEEMS APPROPRIATE. THE SHIPPER'S ATTENTION IS DRAWN TO THE NOTICE CONCERNING CARRIER'S LIMITATION OF LIABILITY. Shipper may increase such limitation of liability by declaring a higher value for carriage and paying a supplemental charge if required.",
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
          addressCountry: 'CN',
        },
      },
      shippersAccountNumber: 'Trade',
      consignee: {
        type: 'Organization',
        name: 'By Acre',
        address: {
          type: 'PostalAddress',
          streetAddress: 'I.C.Modewegs Vej 1',
          addressLocality: 'Kgs. Lyngby',
          postalCode: '2800',
          addressCountry: 'DK',
        },
      },
      requestedRouting: [
        {
          '@context': ['https://w3id.org/traceability/v1'],
          type: 'ShippingStop',
          from: {
            '@context': ['https://w3id.org/traceability/v1'],
            type: 'Place',
            address: {
              type: 'PostalAddress',
              addressLocality: 'Xiamen',
            },
          },
          to: {
            '@context': ['https://w3id.org/traceability/v1'],
            type: 'Place',
            iataAirportCode: 'LUX',
          },
          by: {
            '@context': ['https://w3id.org/traceability/v1'],
            type: 'Organization',
            iataCarrierCode: 'CV',
          },
        },
        {
          '@context': ['https://w3id.org/traceability/v1'],
          type: 'ShippingStop',
          to: {
            '@context': ['https://w3id.org/traceability/v1'],
            type: 'Place',
            iataAirportCode: 'CPH',
          },
          by: {
            '@context': ['https://w3id.org/traceability/v1'],
            type: 'Organization',
            iataCarrierCode: 'CV',
          },
        },
      ],
      destinationAirport: {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'Place',
        iataAirportCode: 'CPH',
        address: {
          type: 'PostalAddress',
          addressLocality: 'Copenhagen',
        },
      },
      requestedFlight: 'CV9586',
      requestedDate: '2021-07-31',
      accountingInformation: 'Freight Collect',
      currency: 'USD',
      chargeCodes: 'CP—destination collect cash',
      weightValuationChargesType: 'Collect',
      otherChargesType: 'Prepaid',
      declaredValueForCarriage: 'NVD',
      declaredValueForCustoms: 'As per invoice',
      amountOfInsurance: 'NIL',
      handlingInformation: 'TOTAL: 13PLT (S) ONLY. INVOICE & PACKING LIST ATTD',
      consignmentRatingDetails: [
        {
          '@context': ['https://w3id.org/traceability/v1'],
          type: 'ConsignmentRatingDetail',
          numberOfPieces: 13,
          grossWeight: 971.0,
          grossWeightUnit: 'Kg',
          rateClass: 'Q—quantity rate',
          chargeableWeight: 2480.5,
          total: 'As arranged',
          natureAndVolumeOfGoods: 'ROLLATORS; DIMS: 2 / 118 X 89 X 87 CM, 11 /118 x 89 X 113 CM, 14.88 CBM',
        },
      ],
      totalNumberOfPieces: 13,
      totalGrossWeight: 971.0,
      totalCharge: 'As arranged',
      collectChargeDeclaration: {
        weightCharge: 'As arranged',
        total: 'As arranged',
      },
      shippersCertificationBox: 'On Time Express Limited, Suite 605, 6/F, Hai Tian Logistics Centre, #1 Hai Tian Road, Hu-Li District, Xiamen, P.R.China',
      executedOn: '2021-07-31',
      executedAt: {
        '@context': ['https://w3id.org/traceability/v1'],
        type: 'Place',
        iataAirportCode: 'XMN',
      }
    },
  };
  return example;
};

module.exports = { getIATAAirWaybillCertificate };
