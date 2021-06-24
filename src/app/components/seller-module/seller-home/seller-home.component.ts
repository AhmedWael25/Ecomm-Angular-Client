import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
  }


  logout(){
    this._authService.logout();
  }

}
