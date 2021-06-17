import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreventLoginRegGuard implements CanActivate,CanActivateChild {

    constructor(private _authService:AuthService,
        private _router:Router,
        private _activatedRoute:ActivatedRoute){

    }

   
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.canActivate(childRoute, state);
     
    }
       
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
        let isAuthenticated = this._authService.isAuthenticated()
    
        if( isAuthenticated ){
            this._router.navigateByUrl("/");
            return false;
        }
        return true;
    
    }
    
}