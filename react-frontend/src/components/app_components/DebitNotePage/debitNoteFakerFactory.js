
import { faker } from "@faker-js/faker";
export default (user,count,invoiceIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
debitNoteID: faker.lorem.sentence(""),
invoiceID: invoiceIDIds[i % invoiceIDIds.length],
issueDate: faker.lorem.sentence(""),
reason: faker.lorem.sentence(""),
amount: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
