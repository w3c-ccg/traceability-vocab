const faker = require('faker');

faker.seed(42);
const CryptoJS = require('crypto-js');
const imageToBase64 = require('image-to-base64');
const { getAgProduct } = require('./AgProduct');
const { getEntity } = require('./Entity');

const getAgPackage = () => {
  // load image and convert to binary for hashing.
  // this is an actual working image so the hash should be valid.
  let binaryImg = '';
  imageToBase64('https://raw.githubusercontent.com/mesur-io/openfoodtrust/main/docs/img/oft-logo-dark-bg.pngpath/to/file.jpg') // Path to the image
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
  // hash the image binary
  const labelImageHash = CryptoJS.SHA256(binaryImg).toString();

  // some example food grades
  // const foodGrades = ['A', 'B', 'No. 1', 'AA', 'U.S. Extra Grade'];

  // Get Entity
  const responsibleParty = getEntity();
  delete responsibleParty['@context'];

  // Get date
  const thisDate = new Date(faker.date.recent());

  // get agProducts
  const agProduct = [];
  let numProds = faker.random.number({ min: 1, max: 3 });
  while (numProds > 0) {
    const prod = getAgProduct();
    delete prod['@context'];
    agProduct.push(prod);
    numProds -= 1;
  }

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'AgPackage',
    packageName: 'Avocados, Bulk',
    grade: 'AA',
    responsibleParty,
    voicePickCode: '4642',
    date: `${thisDate.getFullYear()}-03-14`,
    labelImageUrl: 'https://img.example.org/640/480/',
    labelImageHash,
    agProduct,
  };
  return example;
};

module.exports = { getAgPackage };