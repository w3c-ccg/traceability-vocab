const faker = require("faker");
const { getPostalAddress } = require("./PostalAddress");
const { getPartOfOrder } = require("./PartOfOrder");
// Include delivery methods
const deliverytype = require("../data/generated/delivery-methods.json");
// Include delivery Status
const deliverystatus = require("../data/generated/event-status.json");

const getEcommercePackingListRegistrationEvidenceDocument = () => {
  // get a delivery method
  const randomDelivery = faker.random.number({
    min: 1,
    max: deliverytype.methods.length,
  });
  const deliveryMethod = deliverytype.methods[randomDelivery - 1];
  // get a delivery status
  const randomDeliveryStatus = faker.random.number({
    min: 1,
    max: deliverystatus.status.length,
  });
  const deliveryStatus = deliverystatus.status[randomDeliveryStatus - 1];

  // create list of items and associated orders for the packing list

  const partoforder = [];
  let numorders = faker.random.number({ min: 1, max: 2 });
  while (numorders > 0) {
    const partorder = getPartOfOrder();
    delete partorder["@context"];
    partoforder.push(partorder);
    numorders -= 1;
  }

  // create provider
  const provider = {
    type: "Organization",
    leiCode: faker.random.alphaNumeric(20).toUpperCase(),
    name: faker.company.companyName(),
  };

  // create the required addresses
  const deliveryaddress = getPostalAddress();
  delete deliveryaddress["@context"];
  const originaddress = getPostalAddress();
  delete originaddress["@context"];

  const futureDate = new Date(
    `${faker.random.number({ min: 2030, max: 2040 })}`
  );

  const example = {
    "@context": ["https://w3id.org/traceability/v1"],
    type: "EcommercePackingListRegistrationEvidenceDocument",
    deliveryStatus,
    expectedArrivalFrom: `${futureDate}`,
    hasDeliveryMethod: deliveryMethod,
    deliveryAddress: deliveryaddress,
    provider,
    originAddress: originaddress,
    partOfOrder: partoforder,
  };
  return example;
};

module.exports = { getEcommercePackingListRegistrationEvidenceDocument };
