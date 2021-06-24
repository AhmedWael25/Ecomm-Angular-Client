import { SellerData } from './../../../models/seller/SellerData';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css']
})
export class SellerListComponent implements OnInit {

  sellers : SellerData[];

  constructor(private _adminService:AdminService) { }

  ngOnInit(): void {

    this._adminService.getAllSellers().subscribe(response => {
      console.log(response);
      this.sellers = response.data;
      console.log("sellers :" + JSON.stringify(this.sellers));

    });

  }

}
