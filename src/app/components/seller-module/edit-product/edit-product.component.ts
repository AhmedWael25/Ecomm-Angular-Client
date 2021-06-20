import { SellerProductDetail } from './../../../models/seller/seller.product.datail';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SellerService } from './../../../services/seller.service';
import { Subscription } from 'rxjs';


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
  isinputEnable: boolean = false;

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

  constructor(private _sellerApi:SellerService , private _activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {

    this.subscription = this._activatedRoute.params.subscribe(params => {

      this.productId = params.productId;
      console.log(this.productId);

      this._sellerApi.getProductDetail(this.productId).subscribe(response => {
        console.log(response);
        this.productDetails = response.data;
        console.log("################\n  product: " + JSON.stringify(this.productDetails) + " ##################");

        this._sellerApi.getSubCategories(this.productDetails.sellerProduct.subcategoryId).subscribe(response => {
          console.log(response);
          this.subCategories = response.data;
        });

      });

      // this._sellerApi.getSubCategories(this.productDetails.sellerProduct.subcategoryId).subscribe(response => {
      //   console.log(response);
      //   this.subCategories = response.data;
      // });

    });

  }

  isFieldEnabled(){
    return this.isinputEnable;
  }

  onClickEdit(){
    this.isinputEnable = !this.isinputEnable;
  }

}
