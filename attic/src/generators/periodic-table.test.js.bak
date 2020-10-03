const pt = require('../../data/periodic-table-lookup.json')
const help = require('../help');

it('can convert table to json schema', () => {
    let properties = {};
    pt.order.forEach((element) => {
        let el = pt[element];
        let term = el.name.toLowerCase();
        let id = `https://w3id.org/traceability/${term}`;
        let title = el.name;
        let description = el.summary;
        let symbol = el.symbol;
        properties = {
            ...properties,
            [symbol]: {
                "$comment": `{\"term\": \"${symbol}\", \"@id\": \"${id}\"}`,
                "title": title,
                "description": description,
                "type": "string"
            },
        }
    })
    const PercentComposition = {
        "$id": "https://w3id.org/traceability/schemas/PercentComposition.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$comment": "{\"term\": \"PercentComposition\", \"@id\": \"https://w3id.org/traceability/PercentComposition\"}",
        "title": "Percent Composition",
        "description": "The percent by mass of each element in a compound.",
        "type": "object",
        "properties": properties,
        "additionalProperties": false,
        "examples": []
    }
    // console.log(JSON.stringify(PercentComposition, null, 2));
    help.writeFileToPublic(
        `schemas/PercentComposition.json`,
        JSON.stringify(PercentComposition, null, 2)
    );
})