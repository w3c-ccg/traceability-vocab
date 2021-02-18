const getLinkRole = () => {
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'LinkRole',
    target: 'https://example.com/related/link/123',
    linkRelationship: 'alternate',
  };
  return example;
};

module.exports = { getLinkRole };
