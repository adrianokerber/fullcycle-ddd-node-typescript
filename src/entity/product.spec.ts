import Product from "./product";

describe("Product unit tests", () => {

    it("should throw an error when the ID is empty", () => {
        expect(() => {

            const product = new Product("", "Product 1", 100);

        }).toThrowError("Id is required");
    });

});