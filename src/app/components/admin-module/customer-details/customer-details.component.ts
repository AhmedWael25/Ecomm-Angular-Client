import { CustomerDetails } from './../../../models/customer/CustomerDetails';
import { CustomerData } from './../../../models/customer/CustomerData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerId: number;
  subscription: Subscription;
  customerDetails: CustomerDetails;

  constructor(private _adminService: AdminService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.subscription = this._activatedRoute.params.subscribe(params => {

      this.customerId = params.customerId;

      this._adminService.getCustomerDetails(this.customerId).subscribe(response => {
        console.log(response);
        this.customerDetails = response.data;
        console.log("customer details is : " + JSON.stringify(this.customerDetails));

      });
    });

  }

  getOrdersSize() {
    return this.customerDetails.orderDtoList.length;
  }

  countProductsBought() {
    let productCounter = 0;
    this.customerDetails.orderDtoList.forEach(order => {
      order.orderItems.forEach(item => {
        productCounter += item.quantity;
      });
    });
    return productCounter;
  }

  getOrderPrice(orderId: number) {
    var orderPrice = 0;
    this.customerDetails.orderDtoList.forEach(order => {
      if(order.id == orderId){
        order.orderItems.forEach( item => {
          console.log("price : " + item.unitPrice + "\n quantity : " + item.quantity)
          orderPrice += item.quantity * item.unitPrice;
        });
      }
    });
    return orderPrice;
  }

  getOrderQuantity(orderId: number) {
    var orderQuantity = 0;
    this.customerDetails.orderDtoList.forEach(order => {
      if(order.id == orderId){
        order.orderItems.forEach( item => {
          orderQuantity += item.quantity;
        });
      }
    });
    return orderQuantity;
  }

}
