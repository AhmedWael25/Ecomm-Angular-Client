import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit , OnDestroy{

  private userSub:Subscription;
  isAuthenticated = false;

  constructor(private _authService:AuthService) { }


  ngOnInit(): void {

    this.userSub = this._authService.user.subscribe( user => {
      this.isAuthenticated = !!user;
    } );

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


  logout(){
    this._authService.logout();
  }

}
