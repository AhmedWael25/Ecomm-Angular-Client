import { SellerData } from './../../../models/seller/SellerData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { SellerOrder } from 'src/app/models/seller/SellerOrder';
import { SoldItems } from 'src/app/models/seller/SoldItems';
import { SellerOrderItem } from 'src/app/models/seller/SellerOrderItem';
import { SellerService } from 'src/app/services/seller.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {

  sellerId: number;
  subscription: Subscription;
  sellerDetails : SellerData;

  orderlist:SellerOrder[] = [];
  soldItems: SoldItems[] = [];

  constructor(private _adminService:AdminService, private _activatedRoute:ActivatedRoute
            , private _sellerService:SellerService
            , private _datePipe:DatePipe) { }

  ngOnInit(): void {

    this.subscription = this._activatedRoute.params.subscribe(params => {

      this.sellerId = params.sellerId;

      this._adminService.getSellerDetails(this.sellerId).subscribe(response => {
        console.log(response);
        this.sellerDetails = response.data;
        console.log("seller details is : " + JSON.stringify(this.sellerDetails));
      });

      this._adminService.getSoldItems(this.sellerId).subscribe(
        resp => {
          this.soldItems = resp.data.map(el => {
            let item: SoldItems = new SoldItems();
            item.name = el.name;
            item.orderId = el.orderId;
            item.price = el.price;
            item.productId = el.productId;
            item.soldDate = new Date(el.soldDate);
            item.soldQuantity = el.soldQuantity;
            return item;
          });
          console.log(this.soldItems);
  
          this.prepareOrderList(this.soldItems);
        },
        err => {
          console.log(err);
        },
      );

    });

  }

  prepareOrderList(data: SoldItems[]){
    data.forEach( e => {

      let orderId:number = e.orderId;
      let order:SellerOrder = this._retrieveOrder(orderId);

      console.log(order);
      if(order){
        let item:SellerOrderItem = new SellerOrderItem();
        item.id = e.productId;
        item.name = e.name;
        item.quantity = e.soldQuantity;
        item.price = e.price;

        order.items.push(item);
      }else{
        let order:SellerOrder = new SellerOrder();
        let item:SellerOrderItem = new SellerOrderItem();
        item.id = e.productId;
        item.name = e.name;
        item.quantity = e.soldQuantity;
        item.price = e.price;
        
        let date = e.soldDate;
        let newDate = this._datePipe.transform(new Date(date), "dd-MM-yyyy");
        
        order.date = newDate;
        order.id = e.orderId;
        order.items = [];
        order.items.push(item);

        this.orderlist.push( order );
        console.log("List Now =>>");
      }
    });
    console.log(this.orderlist);
  }

  private  _retrieveOrder(id:number){

    let i:number = 0;
    for(i = 0 ; i < this.orderlist.length ; i ++){
      
      if( this.orderlist[i].id === id ){
        return this.orderlist[i];
      }
    }
    return null;
  }

  totalProductsBought(orders:SellerOrder[]){
    
    let total:number = 0;
    orders.forEach(order =>{
      order.items.forEach( item => {
        total += item.quantity;
      })
    });
    return total;
  }

  orderTotal(order:SellerOrder){
    
    let sum:number = 0;
    order.items.forEach(e => {
      sum += e.price * e.quantity;
    })
    return sum;
  }


  totalProfit(orders:SellerOrder[]){
    let sum:number = 0;
    orders.forEach(order => {
      sum +=  this.orderTotal(order);
    });
    return sum;
  }
}
