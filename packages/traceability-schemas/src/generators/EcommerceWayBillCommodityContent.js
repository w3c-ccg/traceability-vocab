const faker = require('faker');
const { getEcommerceWayBillTotals } = require('./EcommerceWayBillTotals');
const { getEcommerceWayBillCommodityGroup } = require('./EcommerceWayBillCommodityGroup');

const getEcommerceWayBillCommodityContent = () => {
// build the Way Bill Commodity Content Groups
  let numItems = faker.random.number({ min: 1, max: 4 });
  const wayBillGrouping = [];
  while (numItems > 0) {
    const NewWayBillGrouping = getEcommerceWayBillCommodityGroup();
    delete NewWayBillGrouping['@context'];
    wayBillGrouping.push(NewWayBillGrouping);
    numItems -= 1;
  }

  // build the total for the commodity contetn
  const totalsCommodityContent = getEcommerceWayBillTotals();
  delete totalsCommodityContent['@context'];

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceWayBillCommodityContent',
    wayBillGrouping,
    totalsCommodityContent,
  };
  return example;
};

module.exports = { getEcommerceWayBillCommodityContent };
