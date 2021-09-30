const { getCargoItem } = require('./CargoItem');
const { getEntity } = require('./Entity');
const { getTransportEquipment } = require('./TransportEquipment');

const getShippingInstruction = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'ShippingInstruction',
    shippingInstructionID: 'E0559d8308',
    transportDocumentType: 'SWB',
    cargoItems: getCargoItem(),
    utilizedTransportEquipments: getTransportEquipment(),
  };
  return example;
};

module.exports = { getShippingInstruction };

  // "shippingInstruction": {
  //   "shippingInstructionID": "e0559d83-00e2-438e-afd9-fdd610c1a008",
  //   "transportDocumentType": "SWB",
  //   "isShippedOnboardType": true,
  //   "numberOfCopies": 2,
  //   "numberOfOriginals": 4,
  //   "preCarriageUnderShippersResponsibility": "VESSEL",
  //   "invoicePayableAt": {
  //     "UNLocationCode": "USNYC",
  //     "address": {
  //       "cityName": "København",
  //       "stateRegion": "N/A",
  //       "country": "Denmark"
  //     }
  //   },
  //   "isElectronic": true,
  //   "isChargesDisplayed": true,
  //   "carrierBookingReference": "ABC709951",
  //   "cargoItems": [
  //     {
  //       "cargoLineItems": [
  //         {
  //           "cargoLineItemID": "string",
  //           "shippingMarks": "string"
  //         }
  //       ],
  //       "carrierBookingReference": "ABC709951",
  //       "descriptionOfGoods": "string",
  //       "HSCode": "string",
  //       "weight": 13000.3,
  //       "volume": 12,
  //       "weightUnit": "KGM",
  //       "volumeUnit": "CBM",
  //       "numberOfPackages": 18,
  //       "packageCode": "5H",
  //       "equipmentReference": "APZU4812090"
  //     }
  //   ],
  //   "utilizedTransportEquipments": [
  //     {
  //       "equipment": {
  //         "equipmentReference": "APZU4812090",
  //         "ISOEquipmentCode": "stri",
  //         "tareWeight": 12000,
  //         "weightUnit": "KGM",
  //         "isShipperOwned": true
  //       },
  //       "cargoGrossWeightUnit": "KGM",
  //       "cargoGrossWeight": 12000,
  //       "activeReeferSettings": {
  //         "temperatureMin": -18.1,
  //         "temperatureMax": 64.3,
  //         "temperatureUnit": "CEL",
  //         "humidityMin": 80,
  //         "humidityMax": 100,
  //         "ventilationMin": 266,
  //         "ventilationMax": 296
  //       },
  //       "seals": [
  //         {
  //           "sealNumber": "string",
  //           "sealSource": "CUS",
  //           "sealType": "WIR"
  //         }
  //       ]
  //     }
  //   ],
  //   "documentParties": [
  //     {
  //       "party": {
  //         "partyName": "Asseco Denmark",
  //         "taxReference1": "CVR-25645774",
  //         "taxReference2": "CVR-25645774",
  //         "publicKey": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFzaW",
  //         "address": {
  //           "name": "Henrik",
  //           "street": "Kronprincessegade",
  //           "streetNumber": "54",
  //           "floor": "5. sal",
  //           "postCode": "1306",
  //           "city": "København",
  //           "stateRegion": "N/A",
  //           "country": "Denmark"
  //         },
  //         "nmftaCode": "MMCU"
  //       },
  //       "partyFunction": "DDS",
  //       "displayedAddress": [
  //         "Kronprincessegade 54"
  //       ],
  //       "partyContactDetails": {
  //         "name": "Henrik",
  //         "phone": "+45 33364660",
  //         "email": "info@asseco.dk"
  //       },
  //       "isToBeNotified": true
  //     }
  //   ],
  //   "shipmentLocations": [
  //     {
  //       "location": {
  //         "locationName": "Eiffel Tower",
  //         "latitude": "48.85855005644273",
  //         "longitude": "2.294492036190964",
  //         "UNLocationCode": "USNYC",
  //         "address": {
  //           "name": "Henrik",
  //           "street": "Kronprincessegade",
  //           "streetNumber": "54",
  //           "floor": "5. sal",
  //           "postCode": "1306",
  //           "city": "København",
  //           "stateRegion": "N/A",
  //           "country": "Denmark"
  //         }
  //       },
  //       "displayedName": "string",
  //       "locationType": "PRE"
  //     }
  //   ],
  //   "references": [
  //     {
  //       "referenceType": "FF",
  //       "referenceValue": "string"
  //     }
  //   ]
  // }
