import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { SoldItems } from 'src/app/models/seller/SoldItems';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  soldItems:SoldItems[] = [];
  isLoading:boolean = false;

  constructor(private _authService: AuthService,
              private _adminService:AdminService) { }

  ngOnInit(): void {

  }

  logout(){
    return this._authService.logout();
  }

}
