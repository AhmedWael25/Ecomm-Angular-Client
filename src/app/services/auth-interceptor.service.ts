import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { AuthService } from './auth.service';
import { UrlHandlingStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private _authService:AuthService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        console.log("I INTERCEPTED");
        console.log(req.url);

        
        if(this._authService.user.value != null){
            const modifiedRequest = req.clone({ headers: new HttpHeaders().set("Authorization", "Bearer "+ this._authService.user.value.token) });
            return next.handle(modifiedRequest);
        }else{
            next.handle(req);
            return next.handle(req);
        }
    }

}