const fs = require("fs");
const path = require("path");

const { Ed25519KeyPair } = require("@transmute/did-key-ed25519");
const { Ed25519Signature2018 } = require("@transmute/ed25519-signature-2018");
const vcjs = require("@transmute/vc.js");
const { documentLoader } = require("../documentLoader");

describe("Generate Crude Product", () => {
  jest.setTimeout(40*1000);
  it("can issue and verify", async () => {
    const key = await Ed25519KeyPair.from(require("../keypair.json"));
    const verifiableCredential = await vcjs.ld.issue({
      credential: require("../__fixture__/crude.json"),
      suite: new Ed25519Signature2018({
        key,
      }),
      documentLoader,
    });
    const result = await vcjs.ld.verifyCredential({
      credential: verifiableCredential,
      suite: new Ed25519Signature2018(),
      documentLoader,
    });
    expect(result.verified).toBe(true);
    fs.writeFileSync(
      path.resolve(
        __dirname,
        "../../../../docs/credentials/CrudeOilProduct.json"
      ),
      JSON.stringify(verifiableCredential, null, 2)
    );
  });
});
