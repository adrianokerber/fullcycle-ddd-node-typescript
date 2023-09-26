import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerChangedAddressHandler from "../event/handler/customer-changed-address.handler";
import SendLogForCustomerCreated1Handler from "../event/handler/send-log-for-customer-created-1.handler";
import SendLogForCustomerCreated2Handler from "../event/handler/send-log-for-customer-created-2.handler";
import Address from "../value-object/address";
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
        customer.changeAddress(address);

        expect(customer.address).toBe(address);

        const address2 = new Address("Street 2", 123, "12341251", "Montevideo");
        customer.changeAddress(address2);

        expect(customer.address).toBe(address2);

    });

    it("should activate the customer", () => {

        // Arrange
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "12341251", "São Paulo");
        customer.changeAddress(address);

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

    it("should notify of creation event", () => {

        const eventDispatcher = new EventDispatcher();
        
        const eventHandler1 = new SendLogForCustomerCreated1Handler();
        const eventHandler2 = new SendLogForCustomerCreated2Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customer = new Customer("c1", "Customer 1", eventDispatcher);
        const address = new Address("Street 1", 123, "12341251", "São Paulo");
        customer.changeAddress(address); // TODO: should be created with the address or use the setter?

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();

    });

    it("should notify of address changed event", () => {

        const eventDispatcher = new EventDispatcher();

        const eventHandler = new CustomerChangedAddressHandler();
        const spyEventHandler1 = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler);

        const customer = new Customer("c1", "Customer 1", eventDispatcher);
        const address = new Address("Street 1", 123, "12341251", "São Paulo");

        customer.changeAddress(address);

        expect(spyEventHandler1).toHaveBeenCalled();

    });

});