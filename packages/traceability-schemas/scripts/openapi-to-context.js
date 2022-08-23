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
  '../../../docs/contexts/traceability-v2.jsonld'
);

const schemasToContext = (srcSchemas, srcContext) => {
  console.log(srcSchemas[0]);
  const context = srcSchemas.reduce((prev, curr) => {
    const { term } = curr.$linkedData;
    const clone = { ...prev };
    clone[`${term}`] = {
      '@id': curr.$linkedData['@id'],
      '@context': {},
    };

    if (!curr.properties) {
      console.log('No properties for current');
      console.log(curr);
      return prev;
    }

    const keys = Object.keys(curr.properties);
    console.log(`--- ${term} ---`);
    keys.forEach((key) => {
      console.log(key);
      if (key === 'type') {
        return;
      }

      if (!curr.properties[`${key}`].$linkedData) {
        return;
      }

      clone[`${term}`]['@context'][
        `${curr.properties[`${key}`].$linkedData.term}`
      ] = {
        '@id': curr.properties[`${key}`].$linkedData['@id'],
      };
    });

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

fs.writeFileSync(contextPath, stringify(context, { space: '  ' }));
