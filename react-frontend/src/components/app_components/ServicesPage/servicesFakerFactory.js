
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
serviceID: faker.lorem.sentence(1),
name: faker.lorem.sentence("8"),
description: faker.lorem.sentence(""),
units: faker.lorem.sentence(""),
serviceType: faker.lorem.sentence(""),
price: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
