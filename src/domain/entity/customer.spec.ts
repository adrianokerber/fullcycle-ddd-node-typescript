import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw an error when the ID is empty", () => {

        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("Id is required");

    });

    it("should throw an error when the NAME is empty", () => {

        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");

    });

    it("should change the name", () => {

        // Arrange
        const customer = new Customer("123", "John");

        // Act
        customer.changeName("Jane");

        // Assert
        expect(customer.name).toBe("Jane");

    });

    it("should change the address", () => {

        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "12341251", "São Paulo");
        customer.address = address;

        expect(customer.address).toBe(address);

        const address2 = new Address("Street 2", 123, "12341251", "Montevideo");
        customer.address = address2;

        expect(customer.address).toBe(address2);

    });

    it("should activate the customer", () => {

        // Arrange
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "12341251", "São Paulo");
        customer.address = address;

        // Act
        customer.activate();

        // Assert
        expect(customer.isActive()).toBe(true);

    });

    it("should deactivate the customer", () => {

        // Arrange
        const customer = new Customer("1", "Customer 1");

        // Act
        customer.deactivate();

        // Assert
        expect(customer.isActive()).toBe(false);

    });

    it("should throw an error when we try to activate and the address is not set", () => {

        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");

    });

    it("should add reward points", () => {

        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);

    });

});