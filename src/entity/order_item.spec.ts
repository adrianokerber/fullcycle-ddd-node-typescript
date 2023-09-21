import OrderItem from "./order_item";

describe("OrderItem unit tests", () => {

    it("should throw an error if the item quantity is less or equal to zero", () => {

        expect(() => {
            let item = new OrderItem("i1", "Item 1", 100, "p1", 0);
        }).toThrowError("Quantity must be greater than zero");

    });

    it("should return the product price", () => {

        const item = new OrderItem("i1", "Item 1", 100, "p1", 1);

        expect(item.price).toBe(100);

    });

    it("should calculate total price", () => {

        const item = new OrderItem("i1", "Item 1", 100, "p1", 1);

        let total = item.orderItemTotal();

        expect(total).toBe(100);

        const item2 = new OrderItem("i2", "Item 2", 200, "p1", 2);

        total = item2.orderItemTotal();

        expect(total).toBe(400);

    });

});