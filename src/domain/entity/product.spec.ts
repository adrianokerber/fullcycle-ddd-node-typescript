import Product from "./product";

describe("Product unit tests", () => {

    it("should throw an error when the Id is empty", () => {

        expect(() => {

            const product = new Product("", "Product 1", 100);

        }).toThrowError("Id is required");

    });

    it("should throw an error when the Name is empty", () => {

        expect(() => {

            const product = new Product("1", "", 100);

        }).toThrowError("Name is required");

    });

    it("should throw an error when the Price is less then zero", () => {

        expect(() => {

            const product = new Product("1", "Name", -1);

        }).toThrowError("Price must be greater than zero");

    });

    it("should change Name", () => {
        // Arrange
        const product = new Product("1", "Product 1", 100);

        // Act
        product.changeName("Product 2");

        // Assert
        expect(product.name).toBe("Product 2");
    });

    it("should change Price", () => {
        // Arrange
        const product = new Product("1", "Product 1", 100);

        // Act
        product.changePrice(200);

        // Assert
        expect(product.price).toBe(200);
    });

});