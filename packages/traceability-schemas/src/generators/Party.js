const getParty = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'Party',
    partyName: 'Asseco Denmark',
    taxReference1: 'CVR-25645774',
    taxReference2: 'CVR-25645774',
    publicKey: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFzaW',
    nmftaCode: 'MMCU',
  };
  return example;
};

module.exports = { getParty };

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
