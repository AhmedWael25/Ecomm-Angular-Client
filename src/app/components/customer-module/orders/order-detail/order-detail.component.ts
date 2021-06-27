import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order/Order';
import { OrderItem } from 'src/app/models/order/OrderItem';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  constructor(private _activatedRoute:ActivatedRoute,
              private _orderService:OrderService,
              private _router:Router) { }

  orderId:number;
  orderDetail:Order = new Order();
  orderTotal:number;
  paramSubscription:Subscription;
  querySubscription:Subscription;
  isSuccess:boolean = false;

  ngOnInit(): void {


    this.querySubscription = this._activatedRoute.queryParams.subscribe( 
      params =>{
        let temp = params.success
        if(temp == ""){
          this.isSuccess = true;
        }
      });


    this.orderDetail.orderItems = [];   

    this.paramSubscription = this._activatedRoute.params.subscribe(  params => {

     this.orderId =  params.orderId;

     //Check for validity of this order Id
     if( isNaN(+this.orderId) ){
      this._router.navigateByUrl("/404");
      return;
      }

     this._orderService.getOrderDetail(this.orderId).subscribe( 
       resp =>{
      this.orderDetail = resp.data;
      this.orderTotal = this.calculateOrderTotal();
     },
     err => {
      this._router.navigateByUrl("/404");
     } );
    });
  }


  calculateOrderTotal():number{

    let sum:number = 0;

    this.orderDetail.orderItems.forEach( item => {

      sum += (item.quantity * item.unitPrice);
    })


    return sum;
  }

  ngOnDestroy(){
    this.paramSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }



}
