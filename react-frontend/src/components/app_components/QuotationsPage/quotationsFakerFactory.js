
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
quotationID: faker.lorem.sentence(1),
customerID: faker.lorem.sentence(1),
quotationDate: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
totalAmount: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
