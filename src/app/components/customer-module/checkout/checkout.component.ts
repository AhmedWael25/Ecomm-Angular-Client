import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { render} from 'creditcardpayments/creditCardPayments'
import { CartItem } from 'src/app/models/cart/CartItem';
import { CCInfo } from 'src/app/models/checkout/CCInfo';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';
import {MatDialog} from '@angular/material/dialog';


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
              private _changeDetector:ChangeDetectorRef,
              private _notificationService:NotificationService,
              private _dialog: MatDialog) {   }

  form:FormGroup;
  cartItems:CartItem[];
  cartTotal:number;
  method:string = 'creditcard';
  btnText:string = "Checkout";
  @ViewChild("paypalBtns", {static:true}) paypalEl:ElementRef  ;
  isLoading:boolean = false;

  ccNumber:string = "";
  ccCCV:string = "";

   ngOnInit(): void {
    this._cartService.getCartItems().subscribe(resp => {
      this.cartItems = resp.data.items;
      this.calculateTotal();
    },
    err =>{},
    () =>{}
    );
   
    this.form = new FormGroup({
      name:new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-zA-Z ]+$"),
      ]),
      cvv:new FormControl(null, [
        Validators.required, 
        Validators.pattern("^[0-9]{3,4}$"),
      ]),
      number:new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$"),
      ]),
      month: new FormControl("01", [Validators.required]),
      year: new FormControl("21", [Validators.required]),
    });
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
      this.btnText = "Checkout";
    }
  }

  handleCheckout(){

    if(!this.form.valid){
      return;
    }
    this.isLoading = true;

    // this._dialog.open(DialogElementsExample);

    let cc:CCInfo = new CCInfo();
    const req = {
      paymentMethod:"CREDIT_CARD",
      creditCardAuthDto:cc,
    }
    cc.holderName = this.form.value.name;
    cc.cvv= this.form.value.cvv;
    cc.creditCardNumber= this.form.value.number;
    cc.expiry= this.form.value.month +"/"+ this.form.value.year;

  this._checkoutService.creditPayment(req).subscribe(
    resp => {
      console.log(resp);
      let orderId:number = resp.data.id;
      this._router.navigate(["/orders",orderId,], {queryParams:{"success":""}});
      this.isLoading = false;
    },
    err => {
      console.log(err);
      let errMessage = err.error.message;
      this._notificationService.onError(errMessage, 2000, "topRight");
      this.isLoading = false;
    },
  );
    
  }


  getCVV(){
    return this.form.get("cvv");
  }
  getName(){
    return this.form.get("name");
  }
  getNumber(){
    return this.form.get("number");
  }
  getMonth(){
    return this.form.get("month");
  }
  getYear(){
    return this.form.get("year");
  }
}


@Component({
  selector: 'dialog-elements-example',
  templateUrl: './dialog-elements-example.html',
})
export class DialogElementsExample {
  constructor() {}

}