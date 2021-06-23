import { Component, OnInit } from '@angular/core';
import { CustomerOrder } from 'src/app/models/customer/CustomerOrder';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private _customerOrderService:CustomerService) { }

   orders:Array<CustomerOrder>;
   isLoading:boolean = false;

  ngOnInit(): void {

    this.isLoading = true;
    this._customerOrderService.getCustomerOrders().subscribe( resp => {
      this.orders = resp.data;
    },
    err => {},
    () => {
      this.isLoading = false;
    });

  }

  calculateOrderTotal( order:CustomerOrder ):number{

    let sum:number = 0;

    order.orderItems.forEach( item => {

      sum += (item.quantity * item.unitPrice);
    })

    return sum;
  }

}
