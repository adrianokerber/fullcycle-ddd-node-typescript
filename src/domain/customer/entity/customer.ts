import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerChangedAddressEvent from "../event/customer-changed-address.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import Address from "../value-object/address";
import CustomerInterface from "./customer.interface";

export default class Customer implements CustomerInterface {
    
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    private _eventDispatcher: EventDispatcher;

    constructor(id: string, name: string, eventDispatcher: EventDispatcher = new EventDispatcher()) {
        this._id = id;
        this._name = name;
        this._eventDispatcher = eventDispatcher;

        this.validate();
        this.notifyCreatedEvent();
    }

    private validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    private notifyCreatedEvent(): void {
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: this._id,
            name: this._name
        });
        this._eventDispatcher.notify(customerCreatedEvent);
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    changeName(name: string) {
        this._name = name;
        
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;

        this.notifyAddressChangedEvent();
    }

    private notifyAddressChangedEvent(): void {
        const event = new CustomerChangedAddressEvent({
            id: this._id,
            name: this._name,
            address: this._address
        });
        this._eventDispatcher.notify(event);
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
}