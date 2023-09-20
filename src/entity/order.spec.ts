import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw an error when the ID is empty", () => {

        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");

    });

    it("should throw an error when the CustomerId is empty", () => {

        expect(() => {
            let order = new Order("1", "", []);
        }).toThrowError("CustomerId is required");

    });

    it("should throw an error if there are no items", () => {

        expect(() => {
            let order = new Order("1", "123", []);
        }).toThrowError("Order must have at least one item");

    });

    it("should calculate total", () => {

        const item = new OrderItem("i1", "Item 1", 100, 1);
        const order = new Order("o1", "c1", [item]);

        let total = order.total();

        expect(total).toBe(100);

        const item2 = new OrderItem("i2", "Item 2", 200, 1);
        const order2 = new Order("o2", "c1", [item, item2]);

        total = order2.total();

        expect(total).toBe(300);

    });

});