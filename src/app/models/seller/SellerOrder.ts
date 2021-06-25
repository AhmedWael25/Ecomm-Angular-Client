import { SellerOrderItem } from "./SellerOrderItem";

export class SellerOrder{
    
    id:number;
    date:string;
    items:SellerOrderItem[];
    orderState?:boolean;
}