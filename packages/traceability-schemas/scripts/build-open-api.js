const fs = require("fs");
const path = require("path");

console.log("🧪 build open api from intermediate");

const getOpenApiFromIntermediate = require("./getOpenApiFromIntermediate");

const context = getOpenApiFromIntermediate(
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../../../docs/intermediate.json"))
  )
);

fs.writeFileSync(
  path.resolve(__dirname, "../../../docs/traceability-openapi-v1.json"),
  JSON.stringify(context, null, 2)
);
