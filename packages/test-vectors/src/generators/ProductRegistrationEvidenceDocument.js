const faker = require('faker');

const getProductRegistrationEvidenceDocument = () => {
  const pastDate = new Date(faker.date.past());
  const getHTScode = () => {
    const n1 = faker.random.number({min: 1000, max: 9999})
    const n2 = faker.random.number({min: 10, max: 99})
    const n3 = faker.random.number({min: 1000, max: 9999})

    return `${n1}.${n2}.${n3}`;
  };

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'ProductRegistrationEvidenceDocument',
    "category": faker.lorem.sentence(),
    "inProductGroupWithID": faker.lorem.sentence(),
    "productID": faker.random.uuid(),
    "mpn": faker.lorem.word(),
    "gtin": `${faker.random.number({min: 100000000000, max: 99999999999999})}`,
    "isAccessoryOrSparePartFor": faker.lorem.sentence(),
    "releaseDate": pastDate.getMonth() + "-" + pastDate.getDay() + "-" + pastDate.getFullYear(),
    "manufacturer": faker.lorem.word(),
    "globalLocationNumber": `${faker.random.number({min: 1000000000000, max: 9999999999999})}`,
    "leiCode": faker.address.secondaryAddress(),
    "name": faker.lorem.word(),
    "description": faker.lorem.paragraph(),
    "model": faker.random.uuid(),
    "color": faker.internet.color(),
    "material": faker.lorem.word(),
    "weight": `${faker.random.number({min: 1, max: 10, precision: 0.001})} kg`,
    "height": `${faker.random.number({min: 1, max: 10, precision: 0.001})} m`,
    "width": `${faker.random.number({min: 1, max: 10, precision: 0.001})} m`,
    "depth": `${faker.random.number({min: 1, max: 10, precision: 0.001})} m`,
    "url": faker.internet.url(),
    "isBasedOn": faker.internet.url(),
    "image": faker.image.imageUrl(),
    "HTScode": getHTScode()
  };

  return example;
};

module.exports = { getProductRegistrationEvidenceDocument };
