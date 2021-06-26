import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SoldItems } from 'src/app/models/seller/SoldItems';
import { AuthService } from 'src/app/services/auth.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit , OnDestroy{


  private userSub:Subscription;
  isAuthenticated = false;

  constructor(private _authService:AuthService,
              private _sellerService:SellerService,
              private _datePipe:DatePipe) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnInit(): void {

    this.userSub = this._authService.user.subscribe( user => {
      this.isAuthenticated = !!user;
    } );

  }




  logout(){
    this._authService.logout();
  }
}
