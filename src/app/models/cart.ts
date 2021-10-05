import { Customer } from "./customer";

export class Cart{
   cartId?:number; 
   cartAddedOn?:Date;
   cartUpdatedOn?:Date;
   customer?:Customer;
}