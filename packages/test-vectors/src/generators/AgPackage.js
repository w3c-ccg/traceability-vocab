const faker = require('faker');
const { getAgProduct } = require('./AgProduct');
const { getEntity } = require('./Entity');
const CryptoJS = require('crypto-js');
const imageToBase64 = require('image-to-base64');

const getAgPackage = () => {
    //load image and convert to binary for hashing.  this is an actual working image so the hash should be valid.
    let binaryImg = "";
    imageToBase64("https://raw.githubusercontent.com/mesur-io/openfoodtrust/main/docs/img/oft-logo-dark-bg.pngpath/to/file.jpg") // Path to the image
        .then(
            (response) => {
                binaryImg = response;
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    //hash the image binary
    const labelImageHash = CryptoJS.SHA256(binaryImg).toString();

    //some example food grades
    const foodGrades = ["A", "B", "No. 1", "AA", "U.S. Extra Grade"];

    //Get Entity
    const responsibleParty = getEntity();
    delete responsibleParty['@context'];

    //Get date
    const thisDate = new Date(faker.date.recent());

    //get agProducts
    let agProduct = [];
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
        packageName: faker.commerce.productName(),
        grade: foodGrades[faker.random.number({ min: 0, max: 4 })],
        responsibleParty,
        voicePickCode: faker.random.number({ min: 1000, max: 9999 }).toString(),
        date: thisDate.getMonth() + "-" + (thisDate.getDay() + 1) + "-" + thisDate.getFullYear(),
        labelImageUrl: faker.image.imageUrl(),
        labelImageHash,
        agProduct
    };
    return example;
};

module.exports = { getAgPackage };
