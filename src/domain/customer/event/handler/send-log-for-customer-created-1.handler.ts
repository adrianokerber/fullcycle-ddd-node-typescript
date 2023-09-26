import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendLogForCustomerCreated1Handler implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log(`This is the first console.log() of the event "CustomerCreatedEvent" displayed by the "handler_1"`);
    }

}