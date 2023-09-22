import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("OrderService unit tests", () => {

    it("should place an order", () => {

        // Arrange
        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1);

        // Act
        const order = OrderService.placeOrder(customer, [item1]);

        // Assert
        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);

    });

    it("should get total of all orders", () => {

        const item1 = new OrderItem("i1", "Item 1", 100, "p1", 1);
        const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);

        const order = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c1", [item2]);

        const orders = [order, order2];

        const total = OrderService.total(orders);

        expect(total).toBe(500);

    });

});