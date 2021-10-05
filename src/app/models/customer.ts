import { Order } from "./order";

export class Customer{
    custId?:number;
    custName?:string;
    custMail?:string;
    custPwd?:string;
    custAddress?:string;
    custPhone?:string;
    custCreatedOn?:Date;
    custUpdatedOn?:Date;
    order?:Order;
}