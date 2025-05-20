
import { faker } from "@faker-js/faker";
export default (user,count,invoiceIDIds,invoiceItemsIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
invoiceID: invoiceIDIds[i % invoiceIDIds.length],
invoiceItems: invoiceItemsIds[i % invoiceItemsIds.length],
units: faker.lorem.sentence(""),
unitPrice: faker.lorem.sentence(""),
totalAmount: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
