import { SellerData } from './../../../models/seller/SellerData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {

  sellerId: number;
  subscription: Subscription;
  sellerDetails : SellerData;

  constructor(private _adminService:AdminService, private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.subscription = this._activatedRoute.params.subscribe(params => {

      this.sellerId = params.sellerId;

      this._adminService.getSellerDetails(this.sellerId).subscribe(response => {
        console.log(response);
        this.sellerDetails = response.data;
        console.log("seller details is : " + JSON.stringify(this.sellerDetails));
      });
    });

  }

}
