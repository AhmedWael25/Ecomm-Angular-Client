import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SoldItems } from 'src/app/models/seller/SoldItems';
import { AuthService } from 'src/app/services/auth.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {


  constructor(private _authService:AuthService,
              private _sellerService:SellerService,
              private _datePipe:DatePipe) { }
  ngOnInit(): void {


  }



  logout(){
    this._authService.logout();
  }
}
