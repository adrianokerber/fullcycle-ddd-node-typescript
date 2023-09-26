import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: false,
})
export default class ProductModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare price: number;
}