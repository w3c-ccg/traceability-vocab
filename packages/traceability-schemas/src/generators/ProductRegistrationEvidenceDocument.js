const { generator } = require('../data/util/data');

const { faker } = generator;

const getProductRegistrationEvidenceDocument = () => {
  const pastDate = generator.dates.prior;

  const getCategory = () => {
    const types = ['Dietary Supplement', 'Convenience Goods', 'Specialty Goods'];
    return faker.random.arrayElement(types);
  };

  const product = faker.commerce.productName();
  const lei = faker.random.alphaNumeric({ count: 20 }).toUpperCase();

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'ProductRegistrationEvidenceDocument',
    category: getCategory(),
    inProductGroupWithID: `Group${faker.random.number({ min: 100, max: 999 })}`,
    productID: `${faker.random.alphaNumeric(10).toUpperCase()}`,
    mpn: `${faker.random.alphaNumeric(10).toUpperCase()}`,
    gtin: `${faker.random.number({ min: 100000000000, max: 99999999999999 })}`, // 13-14 numeric characters
    isAccessoryOrSparePartFor: 'n/a',
    releaseDate: `${pastDate}`,
    manufacturer: faker.company.companyName(),
    globalLocationNumber: `${faker.random.number({ min: 1000000000000, max: 9999999999999 })}`, // 13 numeric characters
    leiCode: lei,
    name: product,
    description: faker.commerce.productDescription(),
    model: faker.random.uuid(),
    color: faker.commerce.color(),
    material: faker.commerce.productMaterial(),
    weight: `${faker.random.number({ min: 1, max: 10, precision: 0.001 })} kg`,
    height: `${faker.random.number({ min: 1, max: 10, precision: 0.001 })} m`,
    width: `${faker.random.number({ min: 1, max: 10, precision: 0.001 })} m`,
    depth: `${faker.random.number({ min: 1, max: 10, precision: 0.001 })} m`,
    url: `https://example.com/${product}`,
    isBasedOn: faker.commerce.productName(),
    image: faker.image.imageUrl(),
  };

  return example;
};

module.exports = { getProductRegistrationEvidenceDocument };
