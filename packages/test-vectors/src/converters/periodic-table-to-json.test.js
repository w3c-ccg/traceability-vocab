const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const oce = fs
  .readFileSync(
    path.resolve(
      __dirname,
      "../../data/sources//periodic-table/oce.1.0.29.xrdf"
    )
  )
  .toString();

const pt = require("../../data/sources/periodic-table/periodic-table-lookup.json");

let finalJson = {};

it("should generate useful periodic-table-data.json from ontologies", async () => {
  var parser = new xml2js.Parser(/* options */);
  const data = await parser.parseStringPromise(oce);
  const classes = data["rdf:RDF"].Class;

  classes.forEach((classData) => {
    if (classData["chebi:formula"]) {
      const title = classData["obo:OCE_0000061"][0];
      const formula = classData["chebi:formula"][0]._
        ? classData["chebi:formula"][0]._
        : classData["chebi:formula"][0];
      let inchi;

      if (classData["chebi:inchi"]) {
        inchi = classData["chebi:inchi"][0]._
          ? classData["chebi:inchi"][0]._
          : classData["chebi:inchi"][0];
      }
      let inchikey;
      if (classData["chebi:inchikey"]) {
        inchikey = classData["chebi:inchikey"][0]._
          ? classData["chebi:inchikey"][0]._
          : classData["chebi:inchikey"][0];
      }
      let smiles;
      if (classData["chebi:smiles"]) {
        smiles = classData["chebi:smiles"][0]._
          ? classData["chebi:smiles"][0]._
          : classData["chebi:smiles"][0];
      }

      let alternateIds = classData["oboInOwl:hasAlternativeId"]
        ? classData["oboInOwl:hasAlternativeId"].map((d) => {
            return d._;
          })
        : [];

      let dbXrefs = classData["oboInOwl:hasDbXref"]
        ? classData["oboInOwl:hasDbXref"].map((d) => {
            return d._;
          })
        : [];

      let about = classData.$["rdf:about"];

      let ptJson = Object.values(pt).find((el) => {
        return el.symbol === formula;
      });

      let mergedIds = [...alternateIds, ...dbXrefs].map((d) => {
        if (d.indexOf("CHEBI:") === 0) {
          return d.replace("CHEBI:", "https://identifiers.org/CHEBI:");
        }
        if (d.indexOf("CAS:") === 0) {
          return d.replace("CAS:", "https://identifiers.org/CAS:");
        }
        if (d.indexOf("KEGG:") === 0) {
          return d.replace("KEGG:", "https://identifiers.org/KEGG:");
        }
        if (d.indexOf("DrugBank:") === 0) {
          return d.replace("DrugBank:", "https://identifiers.org/DrugBank:");
        }
        if (d.indexOf("HMDB:") === 0) {
          return d.replace("HMDB:", "https://identifiers.org/HMDB:");
        }
        if (d.indexOf("WebElements:") === 0) {
          return (
            d.replace("WebElements:", "https://www.webelements.com/") + "/"
          );
        }

        return d;
      });

      let final = {
        number: ptJson.number,
        symbol: formula,
        inchi,
        inchikey,
        smiles,
        title: ptJson.name,
        description: ptJson.summary,
        wikipedia: ptJson.source,
        oceId: about,
        alternateIds: mergedIds,
      };

      finalJson[final.symbol] = final;
    }
  });

  fs.writeFileSync(
    path.resolve(__dirname, "../../data/generated/periodic-table-data.json"),
    JSON.stringify(finalJson, null, 2)
  );
});
