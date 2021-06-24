import { Product } from 'src/app/models/product/Product';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SellerService } from './../../../services/seller.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerProductDetail } from 'src/app/models/seller/seller.product.datail';
import { NotificationService } from 'src/app/services/notification.service';
import { SellerProductRequest } from 'src/app/models/seller/SellerProductRequest';


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

  productNameValid: string;

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

  constructor(private _sellerApi:SellerService , private _activatedRoute:ActivatedRoute, private _notificationService: NotificationService) {
  }

  ngOnInit(): void {

    this.subscription = this._activatedRoute.params.subscribe(params => {

      this.productId = params.productId;
      console.log(this.productId);

      this._sellerApi.getProductDetail(this.productId).subscribe(response => {
        console.log(response);
        this.productDetails = response.data;
        
        this.form = new FormGroup({
          productName: new FormControl(this.productDetails.sellerProduct.productName, [Validators.required, Validators.minLength(3)]),
          productPrice: new FormControl(this.productDetails.sellerProduct.productPrice, [Validators.required, Validators.minLength(1)]),
          productQuantity: new FormControl(this.productDetails.sellerProduct.productQuantity, [Validators.required, Validators.minLength(1)]),
          productDescription: new FormControl(this.productDetails.sellerProduct.productDescription, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
        });

        this.productNameValid = this.form.getRawValue();
        console.log("################\n  product: " + JSON.stringify(this.productDetails) + " ##################");
      });
      console.log(this.productDetails.sellerProduct.productQuantity);
  
    });

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

}


