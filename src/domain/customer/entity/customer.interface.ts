import Address from "../value-object/address";

export default interface CustomerInterface {

    get id(): string;
    get name(): string;
    get address(): Address
    isActive(): boolean;
    get rewardPoints(): number

}