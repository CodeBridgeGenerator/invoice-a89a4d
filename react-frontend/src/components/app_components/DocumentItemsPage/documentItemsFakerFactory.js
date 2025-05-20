
import { faker } from "@faker-js/faker";
export default (user,count,documentItemsIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
documentType: faker.lorem.sentence("8"),
documentID: faker.lorem.sentence(""),
documentItems: documentItemsIds[i % documentItemsIds.length],
units: faker.lorem.sentence(""),
itemType: faker.lorem.sentence(""),
totalAmount: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
