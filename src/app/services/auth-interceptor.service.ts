import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private _authService:AuthService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        console.log("I INTERCEPTED");
        console.log(req.url);
        
        this._authService.user.pipe( take(1), exhaustMap( user => {

            if(!user){
                return next.handle(req)
            }

            console.log(user);
            const modifiedRequest = req.clone({ headers: new HttpHeaders().set("Authotization", user.token) });

            console.log(user);
            return next.handle(modifiedRequest);
        }) )

        return next.handle(req);
    }

}