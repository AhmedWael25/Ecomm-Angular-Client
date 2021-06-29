import { PageControllerChangeArgs } from './../../shared/page-controller/page-controller.component';
import { SellerProduct } from './../../../models/seller/SellerProduct';
import { Icons } from './../../../icon.constants';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from './../../../services/seller.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  PAGE:number = 0 ;
  SIZE:number = 10 ;
  totalPages : number = 0;
  totalElements : number = 0;
  items:number[] = [] ;

  page : number = this.PAGE ;
  size : number = this.SIZE ;

  sellerId : number ;
  products : SellerProduct[];
  subscription : Subscription ;

  productId: number;

  searchName: string;

  isLoading:boolean = false;

  constructor(private _sellerApi:SellerService,
              private _activatedRoute:ActivatedRoute,
              private _authService:AuthService,
              ) {
  }

  ngOnInit(): void {


      console.log(this.sellerId);


      this.subscription = this._activatedRoute.params.subscribe(params => {

        this.sellerId = this._authService.getUserId();
        this.loadData(this.sellerId,this.page,this.size);

      });

  }

  loadData(sellerId:number,page:number,size:number):void{
    this.isLoading = true;
    this._sellerApi.getInventory(sellerId, page , size ).subscribe(response => {

     if(response.httpCode==200){

       this.products = response.data;

       this.totalElements = response.totalElements;
       this.totalPages = response.totalPages;

        this.items.splice(0);
        for(let i=1; i<= this.totalPages; i++){
          this.items.push(i);
        }

     }else {

       throw new Error(response.message);

     }
     this.isLoading = false;

    });
  }


  onPageControllerChange(changeArgs:PageControllerChangeArgs):void{

    console.log("page controller clicked ");

    this.loadData(this.sellerId,changeArgs.page,changeArgs.size);

  }

}
