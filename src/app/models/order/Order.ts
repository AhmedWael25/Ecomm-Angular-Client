import { OrderItem } from "./OrderItem";

export class Order{

    id:number;
    date:string;
    customerName:string;
    customerAddress:string;
    customerEmail:string;
    customerPhone:string;

    orderItems:Array<OrderItem>;


}