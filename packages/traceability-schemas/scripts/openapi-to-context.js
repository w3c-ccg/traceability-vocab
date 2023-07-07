/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */

const fs = require('fs');
const path = require('path');

const { schemas } = require('../services/schemas');
const rootTerms = require('./rootTerms.json');

const contextPath = path.resolve(
  __dirname,
  '../../../docs/contexts/traceability-v1.jsonld'
);

const undefinedTerms = {};
const showUndefinedTerms = false;

const schemasToContext = (srcSchemas, srcContext) => {
  const context = srcSchemas.reduce((prev, curr) => {
    const clone = { ...prev };
    if (!curr.$linkedData) {
      return clone;
    }
    const { term } = curr.$linkedData;
    const rdfClass = {
      '@id': curr.$linkedData['@id'],
      '@context': {},
    };
    clone[`${term}`] = rdfClass;

    if (!curr.properties) {
      return clone;
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

    return clone;
  }, srcContext);

  return context;
};

console.log('🧪 build context from api');

(() => {
  const context = schemasToContext(schemas);
  const root = {
    '@context': {
      '@version': 1.1,
      '@vocab': 'https://www.w3.org/ns/credentials/issuer-dependent#',
      id: '@id',
      type: '@type',
      ...rootTerms,
      ...context,
    },
  };

  if (showUndefinedTerms) {
    console.log(JSON.stringify(undefinedTerms, null, 2));
  }

  fs.writeFileSync(contextPath, JSON.stringify(root, { space: '  ' }));
})();
