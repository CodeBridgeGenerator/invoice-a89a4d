
import { faker } from "@faker-js/faker";
export default (user,count,POIDIds,customerIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
invoiceID: faker.lorem.sentence(""),
POID: POIDIds[i % POIDIds.length],
customerID: customerIDIds[i % customerIDIds.length],
invoiceDate: faker.lorem.sentence(""),
dueDate: faker.lorem.sentence(""),
totalAmount: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
