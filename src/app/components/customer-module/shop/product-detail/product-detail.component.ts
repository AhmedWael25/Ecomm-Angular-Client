import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemRequest } from 'src/app/models/cart/CartItemRequest';
import { Product } from 'src/app/models/product/Product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product:Product;

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 1000,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    // "dots": true,
    "infinite": true
  };

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _notificationService:NotificationService,
    private _cartService:CartService,
    private _wishlistService:WishListService,
    private _authService:AuthService,
    private _router:Router ) { }

    ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe(params => {
        let id :number = +params.get('id');
  
        this._productService.getProductById(id).subscribe(response => {
          this.product = response.data;
          this.product.prodImages.push(this.product.productImg);
        });
      });
    }

    addToCart( event){
      let prodId:number = this.product.id;

      let isCustomer = this._authService.isCustomer();
      let isAuth = this._authService.isAuthenticated();

      if(!isAuth){
        this._router.navigateByUrl("/login");
        return;
      }
      if(!isCustomer){
        this._router.navigateByUrl("/logout");
        return;
      }
  
      let request:CartItemRequest = new CartItemRequest();
      request.productId = prodId;
      request.quantity = 1;
  
      this._cartService.addCartItem(request).subscribe(
        resp => {
          this._notificationService.onSuccess(resp.message, 3000,"topRight");
        },
        err => {
          let errMsg = err.error.message;
          this._notificationService.onError(errMsg, 3000,"topRight");
        },
      )
    }

    addToWishlist(event){

    }

}
