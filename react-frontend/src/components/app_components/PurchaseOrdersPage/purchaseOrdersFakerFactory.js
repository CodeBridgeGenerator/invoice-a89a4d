
import { faker } from "@faker-js/faker";
export default (user,count,quotationIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
poID: faker.lorem.sentence(1),
quotationID: quotationIDIds[i % quotationIDIds.length],
PODate: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
