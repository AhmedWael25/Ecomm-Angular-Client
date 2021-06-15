import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerAuthService } from 'src/app/services/seller-auth.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css']
})
export class SellerLoginComponent implements OnInit {

  constructor(private _sellerAuthService:SellerAuthService,
              private _router:Router) { }

  isSellerLoggedIn:boolean;

  ngOnInit(): void {

    //TODO ASK ABOUT BEST WAY TO HANDLE THIS
  
    // this.isSellerLoggedIn =  this._sellerAuthService.loggedIn;
    
    // if(this.isSellerLoggedIn){
    //   this._router.navigateByUrl("/seller");
    // }
  
  }

}
