import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProdSoldData } from 'src/app/models/product/ProdSoldData';
import { ProductReview } from 'src/app/models/product/ProductReview';
import { SellerProductDetail } from 'src/app/models/seller/seller.product.datail';
import { SellerProductRequest } from 'src/app/models/seller/SellerProductRequest';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: number;
  subscription: Subscription;
  productDetails : SellerProductDetail;
  subCategories : String[];
  isinputEnable: boolean = true;
  form: FormGroup;

  isChartLoading:boolean = true;
  chartData:Map<string,number> = new Map();

  isOnSale:boolean;
  // saleChange:EventEmitter<MatSlideToggleChange>;
  productNameValid: string;

  totalRating: number;
  reviews: Array<ProductReview>;
  totalElements: number;
  ratingPercentages: Array<number> = new Array(5);

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

  toggleConfig = {
    // height: 25,
    // width: 50,
    margin: 8,
    fontSize: 10,
    color: {
      checked: "#56C128",
      unchecked: "#c70202"
    },
    switchColor: {
      checked: "#3366FF",
      unchecked: "#3366FF"
    },
    labels: {
      unchecked: "Off",
      checked: "On"
    },
    checkedLabel: "",
    uncheckedLabel: "",
    fontColor: {
      checked: "#fafafa",
      unchecked: "#ffffff"
    }
  };


  constructor(private _sellerService:SellerService , 
    private _activatedRoute:ActivatedRoute, 
    private _notificationService: NotificationService,
    private _productService:ProductService,
    private _datePipe:DatePipe,
    private _AuthService: AuthService,
    ) {
}

  
ngOnInit(): void {

  this.subscription = this._activatedRoute.params.subscribe(params => {

    this.productId = params.productId;
    console.log(this.productId);

    this._sellerService.getProductDetail(this.productId).subscribe(response => {
      console.log(response);
      this.productDetails = response.data;
      // this.isOnSale = true;
      this.isOnSale = response.data.sellerProduct.onSale;
      console.log("on sale is : " + this.isOnSale);

      this.form = new FormGroup({
        productName: new FormControl(this.productDetails.sellerProduct.productName, [Validators.required, Validators.minLength(3)]),
        productPrice: new FormControl(this.productDetails.sellerProduct.productPrice, [Validators.required, Validators.minLength(1)]),
        productQuantity: new FormControl(this.productDetails.sellerProduct.productQuantity, [Validators.required, Validators.minLength(1)]),
        productDescription: new FormControl(this.productDetails.sellerProduct.productDescription, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      });

      this.productNameValid = this.form.getRawValue();
      console.log("################\n  product: " + JSON.stringify(this.productDetails) + " ##################");
    });

  });

  // =====================================================================
  this.isChartLoading = true;
  this._productService.getProdSoldData(this.productId).subscribe(
    resp => {
      console.log( resp );

      let prodSoldData:ProdSoldData[] = resp.data.map( element => {
        
        let p = new ProdSoldData();
        p.orderId = element.orderId;
        p.soldQuantity = element.soldQuantity;
        let date = element.soldDate;
        // let newDate = this._datePipe.transform( new Date(date), "dd-MM-yyyy" );
        // p.soldDate = new Date(newDate);
        p.soldDate = new Date(date);

        return p
      } );

      console.log( prodSoldData );
      this._generateChartData( prodSoldData);
     
    },
    err => {
      console.log( err );
    },
    () =>{
      this.isChartLoading = false;
    },
  )
  // =====================================================================
  this.getReviews(this.productId);

  // =====================================================================

}

isFieldEnabled(){
  return this.isinputEnable;
}

onClickEdit(){
  this.isinputEnable = !this.isinputEnable;
}

onClickSave(){

  let sellerProductRequest: SellerProductRequest = this.form.value;
  sellerProductRequest.id = this.productDetails.sellerProduct.id;
  console.log(sellerProductRequest);

  this._sellerService.updateProduct(sellerProductRequest).subscribe(
    response => {
    console.log(response);
    
    if(sellerProductRequest != response.data){
      this.productDetails.sellerProduct.productQuantity = sellerProductRequest.productQuantity;
      this.productDetails.sellerProduct.productPrice = sellerProductRequest.productPrice;
      this.onUpdatedSuccess();
    }
    else{
      this.onUpdatedError();
    }
  },
  err => {
    this.onUpdatedError();
  });

  this.isinputEnable = !this.isinputEnable;
}


onUpdatedSuccess(){
  return this._notificationService.onSuccess('product is updated', 3000, "topRight");
}

onUpdatedError(){
  return this._notificationService.onError(' failed to update product!', 3000, "topRight");
}


private _generateChartData(data:ProdSoldData[]){

  data.forEach(e => {
    let date = e.soldDate
    let newDate = this._datePipe.transform( new Date(date), "dd-MM-yyyy" );

    if( this.chartData.has( newDate ) ){
      let qty = this.chartData.get( newDate );
      this.chartData.set(newDate, qty + e.soldQuantity);
    }else{
      this.chartData.set(newDate,e.soldQuantity);
    }

  });
} 

toggleSale(event){
  
  let sellerProductRequest: SellerProductRequest = new SellerProductRequest;
  sellerProductRequest.id = this.productId;
  sellerProductRequest.onSale = this.isOnSale;

  this._sellerService.updateProductSale(sellerProductRequest).subscribe(
    resp => {
      console.log(resp);
    },
    err => {
      console.log(err);
    },
    () => {},
  );

}

getReviews(productId: number) {
  this._productService.getReviews(productId).subscribe(
    review => {
      this.reviews = review.data;
      this.totalElements = review.totalElements;

      for (let index = 0; index < this.ratingPercentages.length; index++) {
        this.ratingPercentages[index] = Math.round(((this.reviews.filter(function (item) {
          return item.rating == index + 1;
        }).length / this.totalElements * 100) + Number.EPSILON) * 10) / 10;
      }
    }
  );
}

isSeller(){
  return this._AuthService.isSeller();
}

isAdmin(){
  return this._AuthService.isAdmin();
}

}
