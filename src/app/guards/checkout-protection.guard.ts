import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, ActivatedRoute } from '@angular/router';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CheckoutService } from '../services/checkout.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutProtectionGuard implements CanActivate,CanActivateChild {

    
    constructor(private _authService:AuthService,
        private _router:Router,
        private _activatedRoute:ActivatedRoute,
        private _checkoutService:CheckoutService){

    }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.canActivate(childRoute, state);
     
    }
       
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

       return this._checkoutService.validateCheckout()
       .pipe(
            map(
                res => {

                    console.log(res);
                    let isValid:boolean = res.data.state;
                    if (isValid){
                        return isValid;
                    }else{
                        this._router.navigate(["/cart"],{queryParams:{"error":""}});
                        return isValid;
                    }
                }
            ));
    }
    
    
}
