
import { faker } from "@faker-js/faker";
export default (user,count,paymentIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
receiptID: faker.lorem.sentence(1),
paymentID: paymentIDIds[i % paymentIDIds.length],
dateIssued: faker.lorem.sentence(1),
receiptDetails: faker.lorem.sentence(""),
discount: faker.lorem.sentence(""),
totalAmount: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
