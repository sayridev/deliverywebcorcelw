import { IProduct } from "./IProduct";
import { IUserApp } from "./IUserApp";

export interface IOrder {
    id?: string,
    user: IUserApp,
    orders: IDetailOrder[],
    total: number,
    sucursal: string,
    time: number,
    delivery: string,
    address: string,
    date: Date,
    status: boolean,
    send: boolean,
    delivered: boolean
}

export interface IDetailOrder {
    product?: IProduct,
    amount?: number;
    total?: number;
}