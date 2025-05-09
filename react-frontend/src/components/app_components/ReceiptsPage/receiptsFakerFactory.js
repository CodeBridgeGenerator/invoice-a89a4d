
import { faker } from "@faker-js/faker";
export default (user,count,receiptIDIds,paymentIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
receiptID: receiptIDIds[i % receiptIDIds.length],
paymentID: paymentIDIds[i % paymentIDIds.length],
dateIssued: faker.lorem.sentence(""),
receiptDetails: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
