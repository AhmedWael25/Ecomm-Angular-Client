import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  isCustomer: boolean = this._authService.isCustomer();

  isSeller: boolean = this._authService.isSeller();
  
  isAdmin: boolean = this._authService.isAdmin();

  role: string = this.isAdmin ? "Admin" : ( this.isSeller ? "Seller" : "Customer");

  logout(){
    return this._authService.logout();
  }

}
