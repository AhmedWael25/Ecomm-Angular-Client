import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart/Cart';
import { CartItem } from 'src/app/models/cart/CartItem';
import { CartItemRequest } from 'src/app/models/cart/CartItemRequest';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cart: Cart = new Cart();
  cartItems: CartItem[] = [];
  cartTotal: number;
  isCartError: boolean = false;
  isLoading: boolean = false;
  cartErrData: CartItem[] = [];

  constructor(private _cartService: CartService,
    private _checkoutService: CheckoutService,
    private _router: Router,
    private _notificationService: NotificationService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this._cartService.getCartItems().subscribe(resp => {
      console.log(resp);
      this.cart = resp.data;
      this.cartItems = this.cart.items;
      console.log(this.cartItems);
      this.calculateTotal();
      this.isLoading = false;
    },
    err => {
      console.log("Error");
    });

    this._activatedRoute.queryParams.subscribe(
      params => {
        console.log(params)
        let temp = params.error
        console.log(temp);
        if (temp == "") {
          console.log("D5LT");
          this.checkout();
        }
      });
  }

  calculateTotal() {
    let sum = 0;
    this.cartItems.forEach(item => {
      sum += (+item.price * +item.quantity);
    });
    this.cartTotal = sum;
  }


  incrementItem(index: number, event) {
    console.log(index);
    console.log(event);

    let cartItem = this.cartItems[index];
    if (cartItem.quantity == 15) return;
    if (cartItem.quantity > 15) cartItem.quantity = 15;

    event.target.disabled = true;

    cartItem.quantity++;

    let updatedItem = new CartItemRequest();
    updatedItem.quantity = cartItem.quantity;
    updatedItem.productId = cartItem.productId;
    //TODO REMOVE
    updatedItem.customerId = 2;
    this._cartService.updateCartItem(updatedItem).subscribe(
      resp => {
        cartItem.quantity = resp.data.quantity;
        this._notificationService.onSuccess(resp.message, 1000, "topRight");
      },
      err => {
        cartItem.quantity--;
        this._notificationService.onError(err.error.message, 2000, "topRight");
      }, () => {
        event.target.disabled = false;
        this.calculateTotal();
      });
  }

  decrementItem(index: number, event) {
    console.log(index);
    console.log(event);

    let cartItem = this.cartItems[index];
    if (cartItem.quantity == 1) return;
    if (cartItem.quantity < 1) cartItem.quantity = 1;

    event.target.disabled = true;

    cartItem.quantity--;

    let updatedItem = new CartItemRequest();
    updatedItem.quantity = cartItem.quantity;
    updatedItem.productId = cartItem.productId;
    //TODO REMOVE
    updatedItem.customerId = 2;
    this._cartService.updateCartItem(updatedItem).subscribe(
      resp => {
        cartItem.quantity = resp.data.quantity;
        this._notificationService.onSuccess(resp.message, 1000, "topRight");
      },
      err => {
        cartItem.quantity++;
        this._notificationService.onError(err.error.message, 2000, "topRight");
      }, () => {
        event.target.disabled = false;
        this.calculateTotal();
      });
  }

  deleteItem(index: number, event) {
    console.log(index);
    console.log(event);

    event.target.disabled = true;

    let cartItem = this.cartItems[index];
    let updatedItem = new CartItemRequest();
    updatedItem.quantity = cartItem.quantity;
    updatedItem.productId = cartItem.productId;
    //TODO REMOVE
    updatedItem.customerId = 2;
    this._cartService.deleteCartItem(updatedItem).subscribe(
      resp => {
        this.cartItems.splice(index, 1);
        this._notificationService.onSuccess(resp.message, 1000, "topRight");
      },
      err => {
        this._notificationService.onError(err.error.message, 1000, "topRight");
      }, () => {
        event.target.disabled = false;
        this.calculateTotal();
      });

  }

  checkout() {
    //Check Validity of Cart If All Good
    //Redirect to Checkout Page:
    //IF not Display Err To User
    this.isCartError = false;
    this.cartErrData = [];
    this._checkoutService.validateCheckout().subscribe(
      resp => {
        console.log(resp);

        let state = resp.data.state;

        if (state === true) {
          this._router.navigateByUrl("checkout");
        } else {
          //Logic to Check Which one caused the problem. 
          this.isCartError = true;
          let items: CartItem[] = resp.data.cartDto.items;
          items.forEach(el => {
            let itemInCart = this._getCartItemById(el.productId);
            if (itemInCart.quantity > el.quantity) {
              console.log("item" + itemInCart);
              this.cartErrData.push(el);
            }
          });
        }
      },
      err => {
        console.log("ERR");
        console.log(err);
      },
      () => {

      },
    );
  }


  private _getCartItemById(id: number) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].productId == id) {
        return this.cartItems[i];
      }
    }
  }

}
