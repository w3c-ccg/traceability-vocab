const getTransportEquipment = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'TransportEquipment',
    equipmentReference: 'APZU4812090',
  };
  return example;
};

module.exports = { getTransportEquipment };

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
