const faker = require('faker');

const getLEIevidenceDocument = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'LEIevidenceDocument',
    "data": {
      "type": faker.lorem.word(),
      "id": faker.random.uuid(),
      "attributes": {
        "lei": faker.lorem.word(),
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
          "status": faker.lorem.word(),
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
          "initialRegistrationDate": faker.date.past(),
          "lastUpdateDate": faker.date.past(),
          "status": faker.lorem.word(),
          "nextRenewalDate": faker.date.future(),
          "managingLou":  faker.lorem.word(),
          "corroborationLevel": faker.lorem.word(),
          "validatedAt": {
            "id": faker.random.uuid(),
            "other": null
          },
          "validatedAs": faker.random.uuid(),
          "otherValidationAuthorities": {
            "validatedAt": {
              "id": faker.random.uuid(),
            },
            "validatedAs": faker.random.uuid(),
          }
        },
        "bic": []
      }
    }
  };
  return example;
};

module.exports = { getLEIevidenceDocument };
