
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { SellerService } from './../../../services/seller.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerProductDetail } from 'src/app/models/seller/seller.product.datail';
import { NotificationService } from 'src/app/services/notification.service';
import { SellerProductRequest } from 'src/app/models/seller/SellerProductRequest';
import { ProductService } from 'src/app/services/product.service';
import { DatePipe } from '@angular/common';
import { ProdSoldData } from 'src/app/models/product/ProdSoldData';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

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

  constructor(private _sellerApi:SellerService , 
              private _activatedRoute:ActivatedRoute, 
              private _notificationService: NotificationService,
              private _productService:ProductService,
              private _datePipe:DatePipe) {
  }

  ngOnInit(): void {

    this.subscription = this._activatedRoute.params.subscribe(params => {

      this.productId = params.productId;
      console.log(this.productId);

      this._sellerApi.getProductDetail(this.productId).subscribe(response => {
        console.log(response);
        this.productDetails = response.data;
        // this.isOnSale = true;
        this.isOnSale = response.data.sellerProduct.onSale;
        this.form = new FormGroup({
          productName: new FormControl(this.productDetails.sellerProduct.productName, [Validators.required, Validators.minLength(3)]),
          productPrice: new FormControl(this.productDetails.sellerProduct.productPrice, [Validators.required, Validators.minLength(1)]),
          productQuantity: new FormControl(this.productDetails.sellerProduct.productQuantity, [Validators.required, Validators.minLength(1)]),
          productDescription: new FormControl(this.productDetails.sellerProduct.productDescription, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
        });

        console.log("################\n  product: " + JSON.stringify(this.productDetails) + " ##################");
      });
      console.log(this.productDetails.sellerProduct.productQuantity);
  
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

    this._sellerApi.updateProduct(sellerProductRequest).subscribe(response => {
      console.log(response);
      
      if(sellerProductRequest != response.data){
        this.onUpdatedSuccess();
      }
      else{
        this.onUpdatedError();
      }
    });

    this.isinputEnable = !this.isinputEnable;
  }
  

  onUpdatedSuccess(){
    return this._notificationService.onSuccess('WoOoW .. product is updated', 3000, "topRight");
  }

  onUpdatedError(){
    return this._notificationService.onError('Sad .. failed to update product!', 3000, "bottomRight");
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

    this.isOnSale = event.checked;
    
    console.log(this.isOnSale);
    
    let sellerProductRequest: SellerProductRequest = new SellerProductRequest;
    sellerProductRequest.id = this.productId;
    sellerProductRequest.onSale = this.isOnSale;

    this._sellerApi.updateProductSale(sellerProductRequest).subscribe(
      resp => {
        console.log(resp);
      },
      err => {
        console.log(err);
      },
      () => {},
    );

  }

}


