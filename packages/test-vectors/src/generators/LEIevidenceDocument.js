const faker = require('faker');

const getLEIevidenceDocument = () => {
  const pastDate = new Date(faker.date.past());
  const getDataType = () => {
    const types = ['document', 'registration request', 'contract']
    return faker.random.arrayElement(types);
  }

  const getStatus = () => {
    const types = ['REQUESTED', 'CONFIRMED', 'REJECTED', 'IN PROGRESS']
    return faker.random.arrayElement(types);
  }


  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'LEIevidenceDocument',
    "data": {
      "type": getDataType(),
      "id": faker.random.uuid(),
      "attributes": {
        "lei": faker.random.alphaNumeric({count: 20}),
        "entity": {
          "legalName":  {
            "name": faker.company.companyName(),
            "language": null
          },
          "otherNames": [],
          "transliteratedOtherNames": [],
          "legalAddress":  {
            "language":  null,
            "addressLines": [],
            "addressNumber": null,
            "addressNumberWithinBuilding": null,
            "mailRouting": null,
            "city": faker.address.city(),
            "region": faker.address.county(),
            "country":  faker.address.country(),
            "postalCode": faker.address.zipCode()
          },
          "headquartersAddress": {
            "language": null,
            "addressLines": [],
            "addressNumber": null,
            "addressNumberWithinBuilding": null,
            "mailRouting": null,
            "city": faker.address.city(),
            "region": faker.address.county(),
            "country":  faker.address.country(),
            "postalCode": faker.address.zipCode()
          },
          "registeredAt": {
            "id": faker.random.uuid(),
            "other": null
          },
          "registeredAs": faker.address.city(),
          "jurisdiction":  faker.lorem.word(),
          "category": null,
          "legalForm": {
            "id": faker.random.uuid(),
            "other": null
          },
          "associatedEntity": {
            "lei": null,
            "name": null
          },
          "status": getStatus(),
          "expiration": {
            "date": null,
            "reason": null
          },
          "successorEntity": {
            "lei": null,
            "name": null
          },
          "otherAddresses": []
        },
        "registration": {
          "initialRegistrationDate": pastDate.getMonth() + "-" + pastDate.getDay() + "-" + pastDate.getFullYear(),
          "lastUpdateDate": pastDate.getMonth() + "-" + pastDate.getDay() + "-" + pastDate.getFullYear(),
          "status": getStatus(),
          "nextRenewalDate": pastDate.getMonth() + "-" + pastDate.getDay() + "-" + pastDate.getFullYear(),
          "managingLou":  faker.lorem.word(),
          "corroborationLevel": faker.lorem.word(),
          "validatedAt": {
            "id": faker.random.uuid(),
            "other": null
          },
          "validatedAs": faker.random.uuid(),
          "otherValidationAuthorities": []
        },
        "bic": []
      },
      "relationships": {
        "managing-lou": {
          "links": {
            "related": faker.lorem.word(),
          }
        },
        "lei-issuer":  {
          "links": {
            "related": faker.lorem.word(),
          }
        },
        "direct-parent":  {
          "links": {
            "relationship-record": faker.lorem.word(),
            "lei-record": faker.lorem.word(),
          }
        },
        "ultimate-parent": {
          "links": {
            "relationship-record": faker.lorem.word(),
            "lei-record": faker.lorem.word(),
          }
        },
        "direct-children": {
          "links": {
            "relationship-records": faker.lorem.word(),
            "related": faker.lorem.word(),
          }
        },
        "isins": {
          "links": {
            "related": faker.lorem.word(),
          }
        },
      },
      "links": {
        "self": faker.lorem.word(),
      }
    }
  };
  return example;
};

module.exports = { getLEIevidenceDocument };
