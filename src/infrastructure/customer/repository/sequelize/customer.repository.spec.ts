import { Sequelize } from 'sequelize-typescript';
import CustomerRepository from './customer.repository';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import CustomerModel from './customer.model';

describe("CustomerRepository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "ZIP code 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipCode: address.zip,
            city: address.city
        });

    });

    it("should update a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "ZIP code 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipCode: address.zip,
            city: address.city
        });

    });

    it("should find a customer", async () => {

        // Given
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "ZIP code 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        // When
        const foundCustomer = await customerRepository.find("1");

        // Then
        expect(customer).toStrictEqual(foundCustomer);

    });

    it("should throw an erro when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("xxx")
        }).rejects.toThrowError("Customer not found");
    });

    it("should find all customers", async () => {

        // Given
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer("1", "Customer 1");
        const address1 = new Address("Street 1", 1, "ZIP code 1", "City 1");
        customer1.changeAddress(address1);
        customer1.addRewardPoints(10);
        customer1.activate();

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 2", 2, "ZIP code 2", "City 2");
        customer2.changeAddress(address2);
        customer2.addRewardPoints(20);
        customer2.activate();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        // When
        const foundCustomers = await customerRepository.findAll();

        // Then
        expect(foundCustomers).toHaveLength(2);
        expect(foundCustomers).toContainEqual(customer1);
        expect(foundCustomers).toContainEqual(customer1);

    });

});