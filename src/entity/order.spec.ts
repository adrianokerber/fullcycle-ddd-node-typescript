import Order from "./order";

describe("Order unit tests", () => {

    it("should throw an error when the ID is empty", () => {

        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");

    });

});