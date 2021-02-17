const fs = require("fs");
const path = require("path");
const faker = require("faker");

const { Ed25519KeyPair } = require("@transmute/did-key-ed25519");
const { Ed25519Signature2018 } = require("@transmute/ed25519-signature-2018");
const vcjs = require("@transmute/vc.js");
const { documentLoader } = require("../documentLoader");

const identifiers = require("../../../traceability-vocab/data/generated/orderVCIDs.json");

const Randnum = faker.random.number({ min: 1, max: 3 });
let itemVCID = "";
let certname = "";
let ProductCodeType = "";

if (Randnum === 1) {
  ProductCodeType = "UPC";
  itemVCID = identifiers.order[0];
  certname =
    "ACME Ecommerce Universal Product Code Product Registration Certificate";
}
if (Randnum === 2) {
  ProductCodeType = "CO";
  itemVCID = identifiers.order[1];
  certname =
    "ACME Ecommerce Country of Origin Code Product Registration Certificate";
}
if (Randnum === 3) {
  ProductCodeType = "HTS";
  itemVCID = identifiers.order[0];
  certname = "ACME Ecommerce HTS Code Product Registration Certificate";
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
          type: "EcommerceAdditionalProductCodeRegistrationCredential",
          productVCid: itemVCID,
          addProductCode: faker.random.number({
            min: 10000000000000,
            max: 99999999999999,
          }),
          addProductCodeType: ProductCodeType,
          certificateName: certname,
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
        "../../../../docs/credentials/EcommerceAdditionalProductCodeRegistrationCredential.json"
      ),
      JSON.stringify(verifiableCredential, null, 2)
    );
  });
});
