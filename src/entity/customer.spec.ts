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

    it("should change name", () => {

        // Arrange
        const customer = new Customer("123", "John");

        // Act
        customer.changeName("Jane");

        // Assert
        expect(customer.name).toBe("Jane");

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

});