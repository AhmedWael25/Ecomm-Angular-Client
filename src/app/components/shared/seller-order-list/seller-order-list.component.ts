import { Component, Input, OnInit } from '@angular/core';
import { SellerOrder } from 'src/app/models/seller/SellerOrder';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seller-order-list',
  templateUrl: './seller-order-list.component.html',
  styleUrls: ['./seller-order-list.component.css']
})
export class SellerOrderListComponent implements OnInit {


  @Input("data") orderlist:SellerOrder[];

  constructor( private _authService:AuthService) { }

  ngOnInit(): void {
  }


  orderTotal(order:SellerOrder){
    
    let sum:number = 0;
    order.items.forEach(e => {
      sum += e.price * e.quantity;
    })
    return sum;
  }

  isSeller(){
    this._authService.isSeller();
  }

  isAdmin(){
    this._authService.isAdmin();
  }


}
