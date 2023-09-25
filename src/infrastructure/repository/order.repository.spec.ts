import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../db/sequelize/model/customer.model';
import OrderModel from '../db/sequelize/model/order.model';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import ProductModel from '../db/sequelize/model/product.model';
import CustomerRepository from './customer.repository';
import Customer from '../../domain/entity/customer';
import Address from '../../domain/entity/address';
import ProductRepository from './product.repository';
import Product from '../../domain/entity/product';
import OrderItem from '../../domain/entity/order_item';
import Order from '../../domain/entity/order';
import OrderRepository from './order.repository';

describe("OrderRepository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 1, "ZIP code 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "Product 1", 10);
        await productRepository.create(product);

        const item = new OrderItem(
            "i1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("o1", customer.id, [item]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: "o1" },
            include: ["items"],
        });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: "o1",
            customer_id: "c1",
            total: order.total,
            items: [
                {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    order_id: "o1",
                    product_id: "p1",
                },
            ],
        });

    });

    it("should update an order", async () => {

        // Given
        const customerRepository = new CustomerRepository();
        
        const customer1 = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 1, "ZIP code 1", "City 1");
        customer1.changeAddress(address);
        
        const customer2 = new Customer("c2", "Customer 1");
        const address2 = new Address("Street 2", 2, "ZIP code 2", "City 2");
        customer2.changeAddress(address2);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        
        const product1 = new Product("p1", "Product 1", 10);
        const product2 = new Product("p2", "Product 2", 20);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderRepository = new OrderRepository();

        const item1 = new OrderItem(
            "i1",
            product1.name,
            product1.price,
            product1.id,
            1
        );
        const item2 = new OrderItem(
            "i2",
            product1.name,
            product1.price,
            product1.id,
            2
        );
        const item3 = new OrderItem(
            "i3",
            product2.name,
            product2.price,
            product2.id,
            3
        );
        const order = new Order("o1", customer1.id, [item1, item2, item3]);
        
        await orderRepository.create(order);

        // When
        order.customerId = customer2.id;
        order.items = [item2, item3];
        await orderRepository.update(order);

        // Then
        const foundOrder = await OrderModel.findOne({
            where: { id: "o1" },
            include: [
                { model: OrderItemModel }
            ]
        });

        expect(foundOrder?.customer_id).toBe("c2");
        expect(foundOrder?.items).toHaveLength(2);
        expect(foundOrder?.items[0].toJSON()).toStrictEqual({
            id: item2.id,
            name: item2.name,
            order_id: order.id,
            price: item2.price,
            product_id: item2.productId,
            quantity: item2.quantity
        });
        expect(foundOrder?.items[1].toJSON()).toStrictEqual({
            id: item3.id,
            name: item3.name,
            order_id: order.id,
            price: item3.price,
            product_id: item3.productId,
            quantity: item3.quantity
        });

    });

    it("should find an order", async () => {

        // Given
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 1, "ZIP code 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const productRepository = new ProductRepository();
        const product = new Product("p1", "Product 1", 10);
        await productRepository.create(product);
        const item = new OrderItem(
            "i1",
            product.name,
            product.price,
            product.id,
            2
        );
        const order = new Order("o1", customer.id, [item]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        // When
        const foundOrder = await orderRepository.find("o1");

        // Then
        expect(order).toStrictEqual(foundOrder);

    });

    it("should find all orders", async () => {

        // Given
        const customerRepository = new CustomerRepository();
        
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 1, "ZIP code 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        
        const product1 = new Product("p1", "Product 1", 10);
        const product2 = new Product("p2", "Product 2", 20);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderRepository = new OrderRepository();

        const item1 = new OrderItem(
            "i1",
            product1.name,
            product1.price,
            product1.id,
            1
        );
        const item2 = new OrderItem(
            "i2",
            product1.name,
            product1.price,
            product1.id,
            2
        );
        const item3 = new OrderItem(
            "i3",
            product2.name,
            product2.price,
            product2.id,
            3
        );
        const order1 = new Order("o1", customer.id, [item1]);
        const order2 = new Order("o2", customer.id, [item2, item3]);

        await orderRepository.create(order1);
        await orderRepository.create(order2);

        // When
        const foundOrders = await orderRepository.findAll();

        // Then
        expect(foundOrders).toHaveLength(2);
        expect(foundOrders).toContainEqual(order1);
        expect(foundOrders).toContainEqual(order2);

    });

});