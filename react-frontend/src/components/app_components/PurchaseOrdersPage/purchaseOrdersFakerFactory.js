
import { faker } from "@faker-js/faker";
export default (user,count,quotationIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
quotationID: quotationIDIds[i % quotationIDIds.length],
PODate: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
remarks: faker.lorem.sentence(""),
POAmount: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
