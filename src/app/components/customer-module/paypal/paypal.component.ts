import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart/CartItem';
import { Order } from 'src/app/models/order/Order';
import { CheckoutService } from 'src/app/services/checkout.service';
// import { render } from 'creditcardpayments/creditCardPayments';

declare var paypal;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  @Input() cartItems:CartItem[];

  constructor(private _checkoutService:CheckoutService,
              private _router:Router) { }


  @ViewChild("paypalBtns", {static:true}) paypalEl:ElementRef  ;
  payment:Number;


  ngOnInit(): void {
    this.calculateTotal();
    paypal
      .Buttons({
        createOrder : (data,actions) => {
          console.log("=======================");
          console.log(data)
          console.log(actions);
          console.log("=======================");
          return actions.order.create({
            purchase_units:[{
              reference_id:1,
              description: " Products",
              amount:{
                currency_code:'USD',
                value: this.payment,
              }
            }
          ],
          });
        },
        onApprove : async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          console.log(data);
          console.log(actions);
          this._checkoutService.paypalPayment().subscribe( 
            resp => {
              console.log(resp);
              let order:Order = resp.data;
              this._router.navigate(["/orders", order.id]);
            },
            err => {
              console.log(err);
            },
            () =>{

            });
        },
        onError: err => {
          console.log(err);
        },
      })
      .render(this.paypalEl.nativeElement);
    
  }


  calculateTotal(){
    let sum  = 0;
    this.cartItems.forEach( item => {
      sum  += (+item.price * +item.quantity);
    });
    this.payment = sum;
  }

}
