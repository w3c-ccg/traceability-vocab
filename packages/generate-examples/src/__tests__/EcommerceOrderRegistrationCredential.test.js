const fs = require("fs");
const path = require("path");
const faker = require("faker");

const { Ed25519KeyPair } = require("@transmute/did-key-ed25519");
const { Ed25519Signature2018 } = require("@transmute/ed25519-signature-2018");
const vcjs = require("@transmute/vc.js");
const { documentLoader } = require("../documentLoader");

const prods = require("../../../traceability-schemas/src/data/generated/EcomProducts.json");

const orderNumber = `Order#${faker.random.number({ min: 1, max: 999 })}`;

// create a list of ordered products
let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
const orderlist = [];
while (numItemsinOrder > 0) {
  const randomProd = faker.random.number({
    min: 1,
    max: Object.keys(prods).length - 1,
  });
  const itemOrderedProduct = prods[randomProd].productID;
  orderlist.push(itemOrderedProduct);
  numItemsinOrder -= 1;
}

describe("Generate", () => {
  it("can issue and verify", async () => {
    const key = await Ed25519KeyPair.from(require("../keypair.json"));
    const verifiableCredential = await vcjs.ld.issue({
      credential: {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://w3id.org/traceability/v1",
        ],
        id: "https://example.com/credentials/123",
        type: ["VerifiableCredential"],
        issuanceDate: "2021-02-04T20:29:37+00:00",
        issuer: {
          id: "did:example:123",
        },
        credentialSubject: {
          id: "did:web:www.acme.com",
          type: "EcommerceOrderRegistrationCredential",
          orderID: orderNumber,
          productInOrder: orderlist,
          certificateName: "ACME Ecommerce Order Registration Credential",
        },
      },
      suite: new Ed25519Signature2018({
        key,
      }),
      documentLoader,
    });
    // console.log(JSON.stringify(verifiableCredential, null, 2));
    const result = await vcjs.ld.verifyCredential({
      credential: verifiableCredential,
      suite: new Ed25519Signature2018(),
      documentLoader,
    });
    // console.log(result)
    expect(result.verified).toBe(true);
    fs.writeFileSync(
      path.resolve(
        __dirname,
        "../../../../docs/credentials/EcommerceOrderRegistrationCredential.json"
      ),
      JSON.stringify(verifiableCredential, null, 2)
    );
  });
});
