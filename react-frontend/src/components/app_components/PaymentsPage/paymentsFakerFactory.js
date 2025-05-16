
import { faker } from "@faker-js/faker";
export default (user,count,invoiceIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
paymentID: faker.lorem.sentence(""),
paymentMethod: faker.lorem.sentence(""),
dateIssued: faker.lorem.sentence(""),
totalAmount: faker.lorem.sentence(""),
invoiceID: invoiceIDIds[i % invoiceIDIds.length],
paymentStatus: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
