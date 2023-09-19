import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Whesley Willans");
const address = new Address("Rua dois", 2, "123454657", "São Paulo");
customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, 1);
const item2 = new OrderItem("2", "Item 2", 10, 1);

const order = new Order("1", "123", [item1, item2]);