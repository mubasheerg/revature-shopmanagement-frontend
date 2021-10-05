import { Customer } from "./customer";
import { Products } from "./products";

export class Order{
    orderId?:number;
    amount?:number;
    orderedOn?:Date;
    customer?:Customer;
    product?:Products;
}