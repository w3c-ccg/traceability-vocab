const { Ed25519KeyPair } = require("@transmute/did-key-ed25519");
const { Ed25519Signature2018 } = require("@transmute/ed25519-signature-2018");
const vcjs = require("@transmute/vc.js");
const { documentLoader } = require("../documentLoader");

describe("Generate", () => {
  it("can issue and verify", async () => {
    const key = await Ed25519KeyPair.from(require("../keypair.json"));
    const verifiableCredential = await vcjs.ld.issue({
      credential: require("../__fixture__/bol.json"),
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
  });
});

// "specialInstructions": {
//   "type": ["Comment"],
//   "specialInstructions": "Do not expose to elements."
// }
// "item": [
//   {
//     "type": ["ShippedProduct"],
//     "name": "Rebar",
//     "description": "Coiled rebar product.",
//     "quantity": "1000 units",
//     "identifier": "BB12359-1231",
//     "width": "10ft",
//     "height": "5ft",
//     "depth": "25ft",
//     "weight": "10000 lbs",
//     "packagingType": "pallets",
//     "nmfcFreightClass": "50",
//     "hazardCode": "09"
//   }
// ]
