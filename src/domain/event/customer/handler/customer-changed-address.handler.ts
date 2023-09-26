import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class CustomerChangedAddressHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {

    handle(event: CustomerChangedAddressEvent): void {
        console.log(`Address of customer { Id: "${event.eventData.id}", Name: "${event.eventData.name}" } changed to { Address: "${event.eventData.address}" }`);
    }

}