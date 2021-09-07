const { getShippingInstruction } = require('./ShippingInstruction');
const { getPlace } = require('./Place');

const getTransportDocument = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'TransportDocument',
    // placeOfIssue: {
    //   unLocode: 'CNSHA'
    // },
    shippingInstruction: getShippingInstruction(),
  };
  return example;
};

module.exports = { getTransportDocument };

// {
//   "transportDocumentReference": "string",
//   "placeOfIssue": {
//     "UNLocationCode": "USNYC"
//   },
//   "issueDate": "2020-12-12",
//   "shippedOnBoardDate": "2020-12-12",
//   "receivedForShipmentDate": "2020-12-12",
//   "termsAndConditions": "string",
//   "issuerCode": "MMCU",
//   "issuerCodeListProvider": "NMFTA",
//   "declaredValueCurrency": "DKK",
//   "declaredValue": 1231.1,
//   "numberOfRiderPages": 2,
//   "cargoMovementTypeAtOrigin": "FCL",
//   "cargoMovementTypeAtDestination": "FCL",
//   "receiptDeliveryTypeAtOrigin": "CY",
//   "receiptDeliveryTypeAtDestination": "CY",
//   "serviceContractReference": "string",
//   "shippingInstruction": {
//     ... SHIPPING INSTRUCTION
//   },
//   "charges": [
//     {
//       "chargeType": "string",
//       "currencyAmount": 1012.12,
//       "currencyCode": "DKK",
//       "paymentTerm": "PREPAID",
//       "calculationBasis": "Per day",
//       "unitPrice": 3456.6,
//       "quantity": 34.4
//     }
//   ],
//   "clauses": [
//     {
//       "clauseContent": "string"
//     }
//   ],
//   "transports": [
//     {
//       "loadLocation": {
//         "UNLocationCode": "NLRTM"
//       },
//       "dischargeLocation": {
//         "UNLocationCode": "DEDUS"
//       },
//       "plannedDepartureDate": "string",
//       "plannedArrivalDate": "string",
//       "modeOfTransport": "VESSEL",
//       "vesselIMONumber": "1801323",
//       "carrierVoyageNumber": "2103S",
//       "isUnderShippersResponsibility": false
//     }
//   ]
// }
