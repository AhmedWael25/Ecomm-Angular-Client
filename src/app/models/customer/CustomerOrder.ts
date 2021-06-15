import { CustomerOrderItem } from "./CustomerOrderItem";


export class CustomerOrder{

    id:number;
    date:string;
    orderItems:Array<CustomerOrderItem>;

}