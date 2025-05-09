
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
productID: faker.lorem.sentence(1),
name: faker.lorem.sentence(1),
description: faker.lorem.sentence(1),
unitPrice: faker.lorem.sentence(1),
productType: faker.lorem.sentence(1),
unitPrice: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
