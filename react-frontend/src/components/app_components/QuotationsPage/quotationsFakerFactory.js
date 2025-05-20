
import { faker } from "@faker-js/faker";
export default (user,count,customerIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
quotationID: faker.datatype.number(""),
customerID: customerIDIds[i % customerIDIds.length],
quotationDate: faker.datatype.number(""),
status: faker.datatype.number(""),
totalAmount: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
