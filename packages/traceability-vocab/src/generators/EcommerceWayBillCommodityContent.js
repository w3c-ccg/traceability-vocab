
const faker = require('faker');
const { getEcommerceWayBillTotals } = require('./EcommerceWayBillTotals');
const { getEcommerceWayBillCommodityGroup } = require('./EcommerceWayBillCommodityGroup');


const getEcommerceWayBillCommodityContent = () => {

//build the Way Bill Commodity Content Groups
let numItems = faker.random.number({ min: 1, max: 4 });
let wayBillGrouping = [];
while (numItems > 0) {
let NewWayBillGrouping = getEcommerceWayBillCommodityGroup();
delete NewWayBillGrouping['@context'];
wayBillGrouping.push(NewWayBillGrouping);
numItems -= 1;
}

//build the total for the commodity contetn
let totalsCommodityContent = getEcommerceWayBillTotals();
delete totalsCommodityContent['@context'];
    
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceWayBillCommodityContent',
    wayBillGrouping,
    totalsCommodityContent
  };
  return example;
};

module.exports = { getEcommerceWayBillCommodityContent };
