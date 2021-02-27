
const faker = require('faker');
const { getEcommerceWayBillTotals } = require('./EcommerceWayBillTotals');


const getEcommerceWayBillCommodityGroup = () => {

// get a currency
    
let commodityItemNumber = faker.random.alphaNumeric(12);

const getnatureQuantityOfGoods = () => {
    const types = ['A lot of laptops that way a lot','A lot fo stuffed animals, and toys and other useless stuff that weighs a lot'];
    return faker.random.arrayElement(types);
  };

let totalsCommodityGroup = getEcommerceWayBillTotals();
delete totalsCommodityGroup['@context'];
    
  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommerceWayBillCommodityGroup',
    commodityItemNumber,
    natureQuantityOfGoods: getnatureQuantityOfGoods(),
    totalsCommodityGroup
  };
  return example;
};

module.exports = { getEcommerceWayBillCommodityGroup };
