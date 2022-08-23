/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */

const fs = require('fs');
const path = require('path');

const jsonldSchema = require('@transmute/jsonld-schema');
const stringify = require('json-stringify-deterministic');
const { schemas } = require('../services/schemas');
const rootTerms = require('./rootTerms.json');

const contextPath = path.resolve(
  __dirname,
  '../../../docs/contexts/traceability-v1.jsonld'
);

const undefinedTerms = {};
const schemasToContext = (srcSchemas, srcContext) => {
  const context = srcSchemas.reduce((prev, curr) => {
    const { term } = curr.$linkedData;
    const clone = { ...prev };
    const rdfClass = {
      '@id': curr.$linkedData['@id'],
      '@context': {},
    };

    if (!curr.properties) {
      return prev;
    }

    const keys = Object.keys(curr.properties);
    keys.forEach((key) => {
      if (key === 'id' || key === 'type' || key === '@context') {
        return;
      }

      if (!curr.properties[key].$linkedData) {
        if (curr.properties.type.type === 'array') {
          const array =
            curr.properties.type.const || curr.properties.type.items.enum;
          if (array && array.indexOf('VerifiableCredential') === -1) {
            undefinedTerms[term] = undefinedTerms[term] || [];
            undefinedTerms[term].push(key);
          }
        }
        return;
      }

      rdfClass['@context'][curr.properties[key].$linkedData.term] = {
        '@id': curr.properties[key].$linkedData['@id'],
      };
    });

    clone[`${term}`] = rdfClass;
    return clone;
  }, srcContext);
  return {
    '@context': context,
  };
};

console.log('🧪 build context from api');

const context = schemasToContext(schemas, {
  version: 1.1,
  vocab: 'https://w3id.org/traceability/#undefinedTerm',
  id: '@id',
  type: '@type',
  ...rootTerms,
});

// console.log(JSON.stringify(undefinedTerms, null, 2));
fs.writeFileSync(contextPath, stringify(context, { space: '  ' }));
