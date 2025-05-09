
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
paymentID: faker.lorem.sentence(""),
receiptID: faker.lorem.sentence(""),
dateIssued: faker.lorem.sentence(""),
receiptDetails: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
