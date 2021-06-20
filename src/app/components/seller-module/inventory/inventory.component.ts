import { SellerProduct } from './../../../models/seller/SellerProduct';
import { Icons } from './../../../icon.constants';
import { ActivatedRoute } from '@angular/router';
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

  productId: number;

  constructor(private _sellerApi:SellerService , private _activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {

    this.sellerId = 1;
      console.log(this.sellerId);

      this._sellerApi.getInventory(this.sellerId).subscribe(response => {
        console.log(response);
        this.products = response.data;

      });
      
  }

}
