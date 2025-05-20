
import { faker } from "@faker-js/faker";
export default (user,count,customerIDIds,paymentTermsIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
invoiceID: faker.lorem.sentence(""),
customerID: customerIDIds[i % customerIDIds.length],
invoiceDate: faker.lorem.sentence(1),
dueDate: faker.lorem.sentence(1),
totalAmount: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
paymentTermsID: paymentTermsIDIds[i % paymentTermsIDIds.length],
remarks: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
