const fs = require('fs');
const path = require('path');

const contexts = {
  'https://www.w3.org/ns/activitystreams': require('./contexts/activity-pub.json'),
  'https://www.w3.org/ns/credentials/v2': require('./contexts/vc-v1.json'),
  'https://ref.gs1.org/gs1/vc/license-context/': require('./contexts/gs1-license-context.json'),
  'https://ref.gs1.org/gs1/vc/declaration-context/': require('./contexts/declaration-context.json'),
  'https://ref.gs1.org/gs1/vc/trade-item-context/': require('./contexts/trade-item-context.json'),
  'https://w3id.org/vc/status-list/2021/v1': require('./contexts/status-list-v1.json'),
  'https://w3id.org/traceability/v1': JSON.parse(
    fs
      .readFileSync(
        path.resolve(__dirname, '../../../docs/contexts/traceability-v1.jsonld')
      )
      .toString()
  ),
};

module.exports = { contexts };
