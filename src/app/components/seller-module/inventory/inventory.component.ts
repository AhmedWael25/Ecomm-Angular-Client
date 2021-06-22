import { PageControllerChangeArgs } from './../../shared/page-controller/page-controller.component';
import { Icons } from './../../../icon.constants';
import { ActivatedRoute } from '@angular/router';
import { SellerProduct } from './../../../models/seller/seller.product';
import { SellerService } from './../../../services/seller.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  PAGE:number = 0 ;
  SIZE:number = 10 ;

  page : number = this.PAGE ;
  size : number = this.SIZE ;

  sellerId : number ;
  products : SellerProduct[];
  subscription : Subscription ;

  editIcon : string = Icons.editIcon;
  deleteIcon : string = Icons.deleteIcon;


  constructor(private _sellerApi:SellerService , private _activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {

    this.subscription = this._activatedRoute.params.subscribe(params => {

      this.sellerId = params.sellerId;
      console.log(this.sellerId);

      this.loadData(this.sellerId,this.page,this.size);

    });

  }

  loadData(sellerId:number,page:number,size:number):void{

   this._sellerApi.get(sellerId, page , size ).subscribe(response => {

    if(response.httpCode==200){

      this.products = response.data;

    }else {

      throw new Error(response.message);

    }

   });

  }

  onEditClicked(productId:number):void{

    //todo implement this method to perform the action of the selected product to edit screen
    console.log("Product Id "+productId)

  }


  onDeleteClicked(productId:number):void{
    //todo implement delete product
    console.log("product delete pressed ");
  }

  onPageControllerChange(changeArgs:PageControllerChangeArgs):void{

    console.log("page controller clicked ");

    this.loadData(this.sellerId,changeArgs.page,changeArgs.size);

  }

}
