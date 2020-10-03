const fs = require("fs");
const path = require("path");
const help = require("../help");
const xml2js = require("xml2js");

// modified:
// http://www.daml.org/2003/01/periodictable/
// to define missing CAS IDs....
const xmlString = fs
  .readFileSync(path.resolve(__dirname, "../../data/PeriodicTable.owl"))
  .toString();

const pt = require("../../data/periodic-table-lookup.json");

it("can read owl", async () => {
  var parser = new xml2js.Parser(/* options */);
  const jsonData = await parser.parseStringPromise(xmlString);

  const niceOwlMap = {};
  for (let i = 0; i < jsonData["rdf:RDF"].Element.length; i++) {
    const ele = jsonData["rdf:RDF"].Element[i];
    const nice = {
      atomicNumber: ele.atomicNumber[0]._,
      name: ele.name[0]._,
      symbol: ele.symbol[0]._,
      casRegistryID: ele.casRegistryID[0]._,
    };
    niceOwlMap[nice.symbol] = nice;
    // console.log(nice);
  }
  let properties = {};
  pt.order.forEach((element) => {
    let el = pt[element];
    let term = el.name.toLowerCase();
    let id = `https://w3id.org/traceability/${term}`;
    let title = el.name;
    let description = el.summary;
    let symbol = el.symbol;

    let elementProperties = {
      atomicNumber: {
        $comment: `{\"term\": \"atomicNumber\", \"@id\": \"https://w3id.org/traceability/atomicNumber\"}`,
        title: "Atomic Number",
        description: "The number of protons in the nucleus of an atom.",
        type: "number",
        const: niceOwlMap[symbol].atomicNumber,
      },
      chemIdPlus: {
        $comment: `{\"term\": \"webElementID\", \"@id\": \"https://w3id.org/traceability/webElementID\"}`,
        title: "NIH ChemID Plus",
        description: "A link for more information regarding this element.",
        type: "string",
        const: `https://chem.nlm.nih.gov/chemidplus/rn/${niceOwlMap[symbol].casRegistryID}`,
      },
      webElement: {
        $comment: `{\"term\": \"webElementID\", \"@id\": \"https://w3id.org/traceability/webElementID\"}`,
        title: "Web Element ID",
        description: "A link for more information regarding this element.",
        type: "string",
        const: `https://www.webelements.com/${term}/`,
      },
      casRegistryId: {
        $comment: `{\"term\": \"casRegistryID\", \"@id\": \"https://w3id.org/traceability/casRegistryID\"}`,
        title: "CAS Registry Number",
        description:
          "A CAS Registry Number, also referred to as CASRN or CAS Number, is a unique numerical identifier assigned by the Chemical Abstracts Service to every chemical substance described in the open scientific literature, including organic and inorganic compounds, minerals, isotopes, alloys and nonstructurable materials.",
        type: "string",
        const: niceOwlMap[symbol].casRegistryID,
      },
    };

    properties = {
      ...properties,
      [symbol]: {
        $comment: `{\"term\": \"${symbol}\", \"@id\": \"${id}\"}`,
        title: title,
        description: description,
        type: "object",
        properties: elementProperties,
      },
    };
  });

  const PeriodicTable = {
    $id: "https://w3id.org/traceability/schemas/PeriodicTable.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    $comment:
      '{"term": "PeriodicTable", "@id": "https://w3id.org/traceability/PeriodicTable"}',
    title: "Periodic Table",
    description:
      "This data is automatically generated from merging http://www.daml.org/2003/01/periodictable/ with https://github.com/Bowserinator/Periodic-Table-JSON.",
    type: "object",
    properties: properties,
    additionalProperties: false,
    examples: [],
  };
  help.writeFileToPublic(
    `schemas/PeriodicTable.json`,
    JSON.stringify(PeriodicTable, null, 2)
  );
  // console.log(JSON.stringify(PeriodicTable, null, 2));
});
