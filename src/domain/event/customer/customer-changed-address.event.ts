import EventInterface from "../@shared/event.interface";

export default class CustomerChangedAddressEvent implements EventInterface {
    dataTimeOccurred: Date = new Date();
    eventData: any;

    constructor(eventData: any) {
        this.eventData = eventData;
    }

}