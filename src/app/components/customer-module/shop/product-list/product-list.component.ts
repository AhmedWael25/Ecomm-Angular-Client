import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemRequest } from 'src/app/models/cart/CartItemRequest';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/product/Product';
import { Wishlist } from 'src/app/models/wishlist/Wishlist';
import { WishlistProdRequest } from 'src/app/models/wishlist/WishlistProdRequest';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit {

  constructor(private _productService: ProductService,
    private _categoryService: CategoryService,
    private _formBuilder: FormBuilder,
    private _cartService: CartService,
    private _wishlistService: WishListService,
    private _notificationService: NotificationService,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute) { }

  products: Array<Product>;
  categories: Array<Category>;
  checkedSubcategories: Map<number, number> = new Map();

  wishlistIds: number[] = [];


  catParam:number;

  public change(value: boolean, subcategoryId: number) {
    if (value) {
      this.checkedSubcategories.set(subcategoryId, subcategoryId);
    } else {
      this.checkedSubcategories.delete(subcategoryId);
    }
  }

  // Pagination parameters.
  isLoading: boolean = false;
  page: number = 1;
  size: number = 8;
  minPrice: number = 0;
  maxPrice: number = 1000;
  filterFlag: boolean = false;
  totalPages: number;
  totalElements: number;
  name: string;
  options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.minPrice = value;
          return "<b>Min :</b> $" + value;
        case LabelType.High:
          this.maxPrice = value;
          return "<b>Max :</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };

  ngOnInit(): void {

    this.isLoading = true;

    let isAuthenticated = this._authService.isAuthenticated() && this._authService.isCustomer();
    if (isAuthenticated) {

      this._wishlistService.getCustomerWishList().subscribe(
        resp => {
          resp.data.products.forEach(element => {
            this.wishlistIds.push(element.id);
          });
          console.log(this.wishlistIds);
        },
        err => { },
        () => { }
      );
    }

    this.resetFilter();
    this.resetFilter();
  }

  resetFilter() {
    this.isLoading = true;
    this.name = "";
    this.page = 1;
    this.minPrice = 0;
    // this.maxPrice = 10000;
    this.filterFlag = false;

    this.getProducts();
    this.getCategories();

  }

  getProducts() {
    let subcategories = Array.from(this.checkedSubcategories.keys());

    this._productService.getProducts(this.page - 1, this.size, this.minPrice, this.maxPrice, subcategories, this.name).subscribe(
      data => {
        this.products = data.data;

        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.updatePriceSlider(data);

      },
      err =>{
      },() => {
        this.isLoading = false;
      }
    );
  }
  updatePriceSlider(data: any) {
    if (!this.filterFlag) {
      this.maxPrice = data.maxPrice;
    }
    this.options = {
      floor: 0,
      ceil: data.maxPrice,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            this.minPrice = value;
            return "<b>Min :</b> $" + value;
          case LabelType.High:
            this.maxPrice = value;
            return "<b>Max :</b> $" + value;
          default:
            return "$" + value;
        }
      }
    };
  }

  show(id) {
    let element = document.getElementById(id);
    element.classList.toggle("show");
  }

  checkoutForm = this._formBuilder.group({
    name: '',
  });

  onSubmit() {
    this.name = this.checkoutForm.value.name;

    this.getProducts();
  }

  setPage(page: number) {
    this.isLoading = true;
    this.page = page;

    this.getProducts();

  }

  doFilter() {
    this.page = 1;
    this.filterFlag = true;
    this.getProducts();
  }

  getCategories() {
    this._categoryService.getAll().subscribe(
      data => {
        this.categories = data.data;
      }
      , err => {

      },
      () => {
        this.isLoading = false;
      }
    );
  }



  addToCart(index, event) {
    let prod: Product = this.products[index];
    let prodId: number = prod.id;
    console.log(prod, prodId);


    let isCustomer = this._authService.isCustomer();
    let isAuth = this._authService.isAuthenticated();

    if (!isAuth) {
      this._router.navigateByUrl("/login");
      return;
    }
    if (!isCustomer) {
      this._router.navigateByUrl("/logout");
      return;
    }

    let request: CartItemRequest = new CartItemRequest();
    request.productId = prodId;
    request.quantity = 1;

    this._cartService.addCartItem(request).subscribe(
      resp => {
        this._notificationService.onSuccess(resp.message, 3000, "topRight");
      },
      err => {
        let errMsg = err.error.message;
        this._notificationService.onError(errMsg, 3000, "topRight");
      },
    )
  }


  isProductInWishlist(id: number) {
    let isExist = this.wishlistIds.includes(id);
    return isExist;
  }

  deleteFromWishlist(id: number, event) {

    let isCustomer = this._authService.isCustomer();
    let isAuth = this._authService.isAuthenticated();

    if (!isAuth) {
      this._router.navigateByUrl("/login");
    }
    if (!isCustomer) {
      this._router.navigateByUrl("/logout");
    }


    let req: WishlistProdRequest = new WishlistProdRequest();
    req.productId = id;

    this._wishlistService.deleteProdFromWishlist(req).subscribe(
      resp => {
        const index = this.wishlistIds.indexOf(id);
        this.wishlistIds.splice(index, 1);
        this._notificationService.onSuccess(resp.message, 3000, "topRight");
      },
      err => {
        let errMessage: string = err.error.message;
        this._notificationService.onError(errMessage, 3000, "topRight");
      },
    );


  }

  addToWishlist(id: number, event) {

    let isCustomer = this._authService.isCustomer();
    let isAuth = this._authService.isAuthenticated();

    if (!isAuth) {
      this._router.navigateByUrl("/login");
      return;
    }
    if (!isCustomer) {
      this._router.navigateByUrl("/logout");
      return;
    }

    let req: WishlistProdRequest = new WishlistProdRequest();
    req.productId = id;

    this._wishlistService.addProdToWishlist(req).subscribe(
      resp => {
        let id: number = resp.data.id;
        this.wishlistIds.push(id);
        this._notificationService.onSuccess(resp.message, 3000, "topRight");
      },
      err => {
        let errMessage: string = err.error.message;
        this._notificationService.onError(errMessage, 3000, "topRight");
      },
    );

  }

  getSubCategory(id:number){
    this.categories.forEach(categ => {
      categ.subCategories.forEach( sub => {
        if( sub.id === id )
        return sub;
      });
    })
    return null;
  }

}
