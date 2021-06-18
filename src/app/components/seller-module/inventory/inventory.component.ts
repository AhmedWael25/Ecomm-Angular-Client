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

  sellerId : number ;
  products : SellerProduct[];
  subscription : Subscription ;

  editIcon:string = Icons.editIcon;
  deleteIcon:string = Icons.deleteIcon;


  constructor(private _sellerApi:SellerService , private _activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {

    this.subscription = this._activatedRoute.params.subscribe(params => {

      this.sellerId = params.sellerId;
      console.log(this.sellerId);

      this._sellerApi.get(this.sellerId,1,1).subscribe(response => {
        console.log(response);
        this.products = response.data;

      });

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

  refresh(){
    console.log("page controller clicked ");

  }

}
