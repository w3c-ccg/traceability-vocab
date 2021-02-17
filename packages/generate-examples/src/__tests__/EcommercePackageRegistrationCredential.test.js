const fs = require("fs");
const path = require("path");
const faker = require("faker");

const { Ed25519KeyPair } = require("@transmute/did-key-ed25519");
const { Ed25519Signature2018 } = require("@transmute/ed25519-signature-2018");
const vcjs = require("@transmute/vc.js");
const { documentLoader } = require("../documentLoader");

const prods = require("../../../traceability-vocab/data/generated/EcomProducts.json");
const orders = require("../../../traceability-vocab/data/generated/orderVCIDs.json");

// create a list of orderes for products in package
let numOrdersinPackage = faker.random.number({
  min: 1,
  max: Object.keys(orders).length,
});
const packagelist = [];
while (numOrdersinPackage > 0) {
  const itemOrder = orders.order[numOrdersinPackage];
  // create a list of ordered products
  let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
  const productlist = [];
  while (numItemsinOrder > 0) {
    const randomProd = faker.random.number({
      min: 0,
      max: Object.keys(prods).length - 1,
    });
    const itemOrderedProduct = prods[randomProd].productID;
    productlist.push(itemOrderedProduct);
    numItemsinOrder -= 1;
  }
  const item = {
    productReceiptID: `https://example.VC_url.com/?queryID=${faker.random.hexaDecimal(
      64
    )}`,
    packingListID: `https://example.VC_url.com/?queryID=${faker.random.hexaDecimal(
      64
    )}`,
    orderNumber: itemOrder,
    productInOrder: productlist,
  };
  packagelist.push(item);
  numOrdersinPackage -= 1;
}

describe("Generate", () => {
  it("can issue and verify", async () => {
    const key = await Ed25519KeyPair.from(require("../keypair.json"));
    const verifiableCredential = await vcjs.ld.issue({
      credential: {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://w3id.org/traceability/v1",
          {
            productReceiptID:
              "https://w3id.org/traceability#EcommerceProductReceiptRegistrationCredential#receiptID",
          },
          { packingListID: "https://schema.org/identifier" },
          { orderNumber: "https://schema.org/orderNumber" },
          { productInOrder: "https://schema.orgproductID" },
        ],
        id: "https://example.com/credentials/123",
        type: ["VerifiableCredential"],
        issuanceDate: "2021-02-04T20:29:37+00:00",
        issuer: {
          id: "did:example:123",
        },
        credentialSubject: {
          id: "did:web:www.fedex.com",
          type: "EcommercePackageRegistrationCredential",
          trackingID: `${faker.random.number({
            min: 100000000000,
            max: 999999999999,
          })}`,
          packageItems: packagelist,
          certificateName: "Fedex Ecommerce Package Registration Credential",
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
        "../../../../docs/credentials/EcommercePackageRegistrationCredential.json"
      ),
      JSON.stringify(verifiableCredential, null, 2)
    );
  });
});
