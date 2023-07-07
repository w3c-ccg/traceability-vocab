/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */

const jsonld = require('jsonld');
const fs = require('fs');

const documentLoader = require('../services/documentLoader');

const { schemas } = require('../services/schemas');

const verifiableCredentials = schemas
  .map((s) => {
    // skip anything that does not have an example
    if (!s.example) {
      return null;
    }
    try {
      return JSON.parse(s.example);
    } catch (e) {
      console.error(e, s);
    }
    return null;
  })
  .filter((i) => !!i)
  .filter(
    (item) =>
      item.type &&
      (item.type === 'VerifiableCredential' ||
        item.type.includes('VerifiableCredential'))
  )
  .sort((a, b) => (a.type.toString() > b.type.toString() ? -1 : 1));

const vocabBase = 'https://www.w3.org/ns/credentials/issuer-dependent#';

function countOcurrences(str, value) {
  const regExp = new RegExp(value, 'gi');
  return (str.match(regExp) || []).length;
}

(async () => {
    const table = await Promise.all(
      verifiableCredentials.map(async (vc) => {
        //   note the hacky search for a useful credential type here...
        const credentialType = Array.isArray(vc.type)
          ? vc.type[vc.type.length - 1]
          : vc.type;
        const framed = await jsonld.frame(vc, {}, { documentLoader });
        const string = JSON.stringify(framed);
        const undefinedTermCount = countOcurrences(string, vocabBase);
        return { type: credentialType, count: undefinedTermCount };
      })
    );

    fs.writeFileSync(
      '../../docs/credentials-with-issuer-dependent-terms.json',
      JSON.stringify(table, null, 2)
    );
  })();
