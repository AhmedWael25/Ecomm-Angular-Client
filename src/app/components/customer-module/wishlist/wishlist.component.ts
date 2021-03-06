import { Component, OnInit } from '@angular/core';
import { Wishlist } from 'src/app/models/wishlist/Wishlist';
import { WishlistItems } from 'src/app/models/wishlist/WishlistItems';
import { WishlistProdRequest } from 'src/app/models/wishlist/WishlistProdRequest';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private _wishlistService:WishListService, 
              private _cartService:CartService,
              private _notificationService:NotificationService) { }

  wishlist:Wishlist =  new Wishlist();
  isLoading:boolean = false;
  isError:boolean = false;

  ngOnInit(): void {
    
    this.isLoading = true;
    console.log("EDLO");
    this._wishlistService.getCustomerWishList().subscribe(
      resp =>{
        this.wishlist =  resp.data;
      },
      err => {
        console.log(err);
      },
      () =>{
        this.isLoading = false;
      }
    );
  
  }



  deleteItem(index, event){
    
  console.log(index);

    let item = this.wishlist.products[index];

    let req = new WishlistProdRequest();
    req.productId = item.id;
    //TODO REMOV THIS
    req.customerId = 0;
    
    this._wishlistService.deleteProdFromWishlist(req).subscribe(
      resp =>{
        console.log(resp.data);
        
        if(resp.data == true){
          this.wishlist.products.splice(index, 1);
          this._notificationService.onSuccess(resp.message, 3000,"topRight");
        }
      },
      err =>{
        console.log(err);
        this._notificationService.onError("Something Wrong happened, Try Again Later", 3000,"topRight");
      }, 
      () =>{

      }
    );
  }


}
