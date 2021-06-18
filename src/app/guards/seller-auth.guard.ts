import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerAuthService } from '../services/seller-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuard implements CanActivate,CanActivateChild {


  constructor(private _authService:SellerAuthService,
              private _router:Router,
              private _activatedRoute:ActivatedRoute){

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

   return this.canActivate(childRoute, state);

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    // return this._authService.isAuthenticated()
    // .then ( (authenticated:boolean) => {

    //     if(authenticated){
    //       return true;
    //     }else{
    //       this._router.navigateByUrl("/seller/login");
    //     }
    //   }
    // );
    return true;


  }
//   constructor(private _userService:UserService
//     ,private _router:Router
//     ){}
//   canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
//    return this.canActivate();
//   }
//   canActivate():boolean{
//   let logged= this._userService.isLogged();
// if(!logged)
// this._router.navigateByUrl('/user/login');
//   return logged;

//   }


}
