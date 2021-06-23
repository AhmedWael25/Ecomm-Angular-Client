import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { render} from 'creditcardpayments/creditCardPayments'
import { CartItem } from 'src/app/models/cart/CartItem';
import { CCInfo } from 'src/app/models/checkout/CCInfo';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CustomerService } from 'src/app/services/customer.service';

declare var paypal;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private _customerService:CustomerService,
              private _cartService:CartService,
              private _checkoutService:CheckoutService,
              private _router:Router,
              private _changeDetector:ChangeDetectorRef) {   }

  form:FormGroup;
  cartItems:CartItem[];
  cartTotal:number;
  method:string = 'creditcard';
  btnText:string = "Continue to Paypal checkout";
  @ViewChild("paypalBtns", {static:true}) paypalEl:ElementRef  ;

  ccNumber:string = "";
  ccCCV:string = "";

   ngOnInit(): void {
    this._cartService.getCartItems().subscribe(resp => {
      console.log( resp );
      this.cartItems = resp.data.items;
      console.log(this.cartItems);
      this.calculateTotal();
    },
    err =>{},
    () =>{}
    );
   
    this.form = new FormGroup({});

  }

  calculateTotal(){
    let sum  = 0;
    this.cartItems.forEach( item => {
      sum  += (+item.price * +item.quantity);
    });
    this.cartTotal = sum;
  }

  onChange(event){
    this.method = event;
    if(this.method === "paypal"){
      this.btnText = "Continue to Paypal checkout";
    }
    else {
      this.btnText = "Pay";
    }
  }

  handleCheckout(){
    if(this.method === "paypal"){

    }
    else {

      let cc:CCInfo = new CCInfo();
      cc.creditCardNumber = this.ccNumber;
      cc.cvv = this.ccCCV;
      const req = {
        paymentMethod:"CREDIT_CARD",
        creditCardAuthDto:cc,
      }
      this._checkoutService.creditPayment(req).subscribe(
        resp => {
          console.log(resp);
        },
        err => {
          console.log(err);
        },
        () =>{},
      );
    }
  }


}
