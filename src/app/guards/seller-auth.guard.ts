import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuard implements CanActivate,CanActivateChild {


  constructor(private _authService:AuthService,
              private _router:Router,
              private _activatedRoute:ActivatedRoute){

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

   return this.canActivate(childRoute, state);

  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    
    let isAuthenticated = this._authService.isAuthenticated()
    let roleConst = route.data.role;
      
    console.log( state.url );
    //Check Authentication
    if( isAuthenticated ){
    // Check Role
        let userRole = this._authService.user.value.role;
      
        if( roleConst === userRole ){
          return true;
        }else{
          this._router.navigateByUrl("/seller/login");
          return false;
        }
        
    }else{
      this._router.navigateByUrl("/seller/login");
      return false;
    }

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
