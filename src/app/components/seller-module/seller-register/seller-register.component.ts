import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css']
})
export class SellerRegisterComponent implements OnInit {

  constructor(private _authService: AuthService,
    private _router: Router) { }

  isSellerLoggedIn: boolean;

  ngOnInit(): void {

    //TODO ASK ABOUT BEST WAY TO HANDLE THIS

    // this.isSellerLoggedIn = this._sellerAuthService.loggedIn;

    // if (this.isSellerLoggedIn) {
    //   this._router.navigateByUrl("/seller");
    // }

  }

}
