const fs = require('fs');
const path = require('path');
const faker = require('faker');
const issuer = require('../services/issuer');
const prods = require('../../test-vectors/data/generated/EcomProducts.json');

const orderNumber = `Order#${faker.random.number({ min: 1, max: 999 })}`;

// create a list of ordered products
let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
const orderlist = [];
while (numItemsinOrder > 0) {
  const randomProd = faker.random.number({ min: 1, max: Object.keys(prods).length - 1 });
  const itemOrderedProduct = prods[randomProd].productID;
  orderlist.push(itemOrderedProduct);
  numItemsinOrder -= 1;
}

it('can issue / verify Ecommerce Order Registration', async () => {
  const { verified, verifiableCredential } = await issuer.issue({
    credentialSubject: {
      id: 'did:web:www.acme.com',
      type: 'EcommerceOrderRegistrationCredential',
      orderID: orderNumber,
      productInOrder: orderlist,
      certificateName: 'ACME Ecommerce Order Registration Credential',
    },
  }, [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/traceability/v1',
  ]);
  expect(verified).toBe(true);
  fs.writeFileSync(path.resolve(__dirname, '../../../docs/credentials/EcommerceOrderRegistrationCredential.json'), JSON.stringify(verifiableCredential, null, 2));
});
