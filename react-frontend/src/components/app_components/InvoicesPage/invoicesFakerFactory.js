
import { faker } from "@faker-js/faker";
export default (user,count,customerIDIds,invoiceItemsIds,paymentTermsIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
invoiceID: faker.lorem.sentence(""),
customerID: customerIDIds[i % customerIDIds.length],
invoiceDate: faker.lorem.sentence(""),
dueDate: faker.lorem.sentence(""),
totalAmount: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
invoiceItems: invoiceItemsIds[i % invoiceItemsIds.length],
paymentTermsID: paymentTermsIDIds[i % paymentTermsIDIds.length],
remarks: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
