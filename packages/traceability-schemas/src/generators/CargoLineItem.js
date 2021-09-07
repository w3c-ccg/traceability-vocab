const getCargoLineItem = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'CargoLineItem',
    cargoLineItemID: '3312591',
    shippingMarks: 'Premium break pads'
  };
  return example;
};

module.exports = { getCargoLineItem };

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
