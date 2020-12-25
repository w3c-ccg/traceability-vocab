const faker = require('faker');

const getProductRegistrationEvidenceDocument = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'ProductRegistrationEvidenceDocument',
    "category": faker.lorem.sentence(),
    "inProductGroupWithID": faker.lorem.sentence(),
    "productID": faker.random.uuid(),
    "mpn": faker.lorem.word(),
    "gtin": faker.internet.url(),
    "isAccessoryOrSparePartFor": faker.lorem.sentence(),
    "releaseDate": faker.date.past(),
    "manufacturer": faker.lorem.word(),
    "globalLocationNumber": faker.address.secondaryAddress(),
    "leiCode": faker.address.secondaryAddress(),
    "name": faker.lorem.word(),
    "description": faker.lorem.paragraph(),
    "model": faker.random.uuid(),
    "color": faker.internet.color(),
    "material": faker.lorem.word(),
    "weight": `${faker.random.number()} kg`,
    "height": `${faker.random.number()} m`,
    "width": `${faker.random.number()} m`,
    "depth": `${faker.random.number()} m`,
    "url": faker.internet.url(),
    "isBasedOn": faker.internet.url(),
    "image": faker.image.imageUrl(),
    "HTScode": faker.random.uuid()
  };

  return example;
};

module.exports = { getProductRegistrationEvidenceDocument };
