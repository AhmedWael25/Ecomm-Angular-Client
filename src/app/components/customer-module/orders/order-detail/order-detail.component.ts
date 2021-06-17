import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
              private _orderService:OrderService) { }

  orderId:number;
  orderDetail:Order = new Order();
  orderTotal:number;
  paramSubscription:Subscription;

  ngOnInit(): void {

    this.orderDetail.orderItems = [];   


    this.paramSubscription = this._activatedRoute.params.subscribe(  params => {

     this.orderId =  params.orderId;

     this._orderService.getOrderDetail(this.orderId).subscribe( resp =>{

      this.orderDetail = resp.data;
      // console.log(this.orderDetail);
      this.orderTotal = this.calculateOrderTotal();

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
  }



}
