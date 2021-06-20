import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart/Cart';
import { CartItem } from 'src/app/models/cart/CartItem';
import { CartItemRequest } from 'src/app/models/cart/CartItemRequest';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cart:Cart = new Cart();
  cartItems:CartItem[];
  cartTotal:number;

  constructor(private _cartService:CartService) { }

  ngOnInit(): void {
    this._cartService.getCartItems().subscribe(resp => {
      console.log( resp );
      this.cart = resp.data;
      this.cartItems = this.cart.items;
      console.log(this.cartItems);
      this.calculateTotal();
    },
    err =>{
      
    });
    
  }

  calculateTotal(){
    let sum  = 0;
    this.cartItems.forEach( item => {
      sum  += (+item.price * +item.quantity);
    });
    this.cartTotal = sum;
  }


  incrementItem(index:number, event){
    console.log(index);
    console.log(event);

    let cartItem = this.cartItems[index];
    if(cartItem.quantity == 15) return;
    if(cartItem.quantity > 15) cartItem.quantity = 15; 

    event.target.disabled = true;

    cartItem.quantity++;

    let updatedItem = new CartItemRequest();
    updatedItem.quantity = cartItem.quantity;
    updatedItem.productId = cartItem.productId;
    //TODO REMOVE
    updatedItem.customerId = 2;
    this._cartService.updateCartItem(updatedItem).subscribe( 
      resp =>{
        cartItem.quantity = resp.data.quantity;
      },
      err =>{
        cartItem.quantity--;
      },() =>{
        event.target.disabled = false;
        this.calculateTotal();
      } );
  }

  decrementItem(index:number,event){
    console.log(index);
    console.log(event);

    let cartItem = this.cartItems[index];
    if(cartItem.quantity == 1) return;
    if(cartItem.quantity < 1) cartItem.quantity = 1; 

    event.target.disabled = true;

    cartItem.quantity--;

    let updatedItem = new CartItemRequest();
    updatedItem.quantity = cartItem.quantity;
    updatedItem.productId = cartItem.productId;
    //TODO REMOVE
    updatedItem.customerId = 2;
    this._cartService.updateCartItem(updatedItem).subscribe( 
      resp =>{
        cartItem.quantity = resp.data.quantity;
      },
      err =>{
        cartItem.quantity++;
      },() =>{
        event.target.disabled = false;
        this.calculateTotal();
      } );
  }

  deleteItem(index:number,event){
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
      resp =>{
        this.cartItems.splice(index, 1);
      },
      err =>{
        
        console.log(err);
        console.log("ERROR");
      },() =>{
        event.target.disabled = false;
        this.calculateTotal();
      } );
    
  }

}
