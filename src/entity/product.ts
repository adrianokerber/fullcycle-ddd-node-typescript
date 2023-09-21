export default class Product {
    
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;

        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
    }
}