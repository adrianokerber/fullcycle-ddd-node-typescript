import ProductFactory from "./product.factory";

describe("ProductFactory unit tests", () => {

    it("should create a product of type A", () => {

        const product = ProductFactory.create("a", "Product A", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product");

    });

    it("should create a product of type B", () => {

        const product = ProductFactory.create("b", "Product B", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe("ProductB");

    });

    it("should throw an error when product type is not supported", () => {

        expect(() => ProductFactory.create("c", "Product C", 1))
            .toThrowError("Product type not supported");

    });

});