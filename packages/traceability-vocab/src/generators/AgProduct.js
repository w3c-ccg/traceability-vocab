const faker = require('faker');

faker.seed(42);
const CryptoJS = require('crypto-js');
const imageToBase64 = require('image-to-base64');

const { getProduct } = require('./Product');

const getAgProduct = () => {
  // load image and convert to binary for hashing.
  // this is an actual working image so the hash should be valid.
  let binaryImg = '';
  imageToBase64('https://raw.githubusercontent.com/mesur-io/openfoodtrust/main/docs/img/oft-logo-dark-bg.png') // Path to the image
    .then(
      (response) => {
        binaryImg = response;
      },
    )
    .catch(
      (error) => {
        // eslint-disable-next-line
        console.log(error);
      },
    );

  // Get Product
  const product = getProduct();
  delete product['@context'];
  product.name = 'Avocados';
  product.description = 'Avocados, 4 pack boxes';

  // hash the image binary
  const labelImageHash = CryptoJS.SHA256(binaryImg).toString();

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'AgProduct',
    upc: '033383401508', // faker.random.number({ min: 100000000000, max: 999999999999 }).toString(),
    plu: '94225', // faker.random.number({ min: 1000, max: 9999 }).toString(),
    gtin: '033383401508', // faker.random.number({ min: 10000000000000, max: 99999999999999 }).toString(),
    product,
    scientificName: 'Persea americana',
    labelImageUrl: 'https://img.example.org/033383401508/640/480/', // faker.image.imageUrl(),
    labelImageHash,
  };
  return example;
};

module.exports = { getAgProduct };
