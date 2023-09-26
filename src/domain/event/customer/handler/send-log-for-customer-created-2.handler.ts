import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendLogForCustomerCreated2Handler implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log(`This is the second console.log() of the event "CustomerCreatedEvent" displayed by the "handler_2"`);
    }

}