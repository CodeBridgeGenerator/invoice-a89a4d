
import { faker } from "@faker-js/faker";
export default (user,count,invoiceIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
creditNoteID: faker.lorem.sentence(1),
invoiceID: invoiceIDIds[i % invoiceIDIds.length],
issueDate: faker.lorem.sentence(1),
reason: faker.lorem.sentence(1),
amount: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
