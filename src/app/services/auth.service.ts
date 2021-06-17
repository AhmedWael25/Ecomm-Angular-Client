import { ThrowStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { LoginRequest } from "../models/login/loginRequest";
import { UserAuthInfo } from "../models/login/UserAuthInfo";
import { URLS } from "../url.constants";
import { ApiService } from "./api.service";
import jwt_decode from 'jwt-decode';
import { repeat } from "rxjs/operators";
import { AuthResponse } from "../models/login/AuthResponse";
import { DecodedToken } from "../models/login/decodedToken";

@Injectable({
    providedIn: 'root'
  })
export class AuthService{

    private baseUrl = URLS.apiUrl +"/login";
    private  USER_DATA:string ="userData";
    private expirationTimer:any;

    constructor(private _apiService:ApiService){}

    //TODO REFACTOR
    loggedIn:boolean =  true;

    user = new BehaviorSubject<UserAuthInfo>(null);
    token = null;

    sellerId:number  = 1;
    role:string = "";

    // login(){
    //     this.loggedIn = true;
    // }

    // logout(){
    //     this.loggedIn = false;
    // }

    // isCustomer():boolean{
    //     return this.user === "ROLE_CUSTOMER" ? true : false;
    // }
    // isSeller():boolean{
    //     return this.role === "ROLE_SELLER" ? true : false;
    // }
    // isAdmin():boolean{
    //     return this.role === "ROLE_ADMIN" ? true : false;
    // }
    // getUserId(){
        // 
    // }

    attemptLogin(loginRequest:LoginRequest):boolean{
        
        this._apiService.post(this.baseUrl, loginRequest).subscribe(
            resp => {
                console.log(resp);
                let authResp:AuthResponse = resp.data;
                

                this.handleAuthentication(authResp);
               return true;
            },
            err => {
                return false;
            }
        );

        //create new UserAuthInfo from response data 
        //emit the user
        // this.user.next


        return true;
    }


    handleAuthentication(authResponse:AuthResponse){

        let token = authResponse.jwt;
        let decodedToken:DecodedToken = this.getDecodedToken(token);


        const expDurationInSeconds = +decodedToken.exp - +decodedToken.iat;
        const expDate = new Date( new Date().getTime() + expDurationInSeconds*1000 );
        const userData = new UserAuthInfo(
            decodedToken.id,
            decodedToken.sub,
            decodedToken.role,
            token,
            expDate,
        );
        
        //Emit User -- Log user in our App.
        this.user.next(userData);
        // Auto Logout activation
        this.autoLogout(expDurationInSeconds * 1000);
        // Save in Local Storage
        localStorage.setItem(this.USER_DATA, JSON.stringify( userData ));
    }

    autoLogin(){
        const userData:{id:number,email:string, role:string,_jwt:string, _jwtExpireDate:string} = JSON.parse(localStorage.getItem(this.USER_DATA));
        
        if(!userData){
            return ;
        } 
        
        const loadedUser = new UserAuthInfo(userData.id, userData.email,userData.role,userData._jwt, new Date(userData._jwtExpireDate) );

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expDate = new Date(userData._jwtExpireDate).getTime() - new Date().getTime();
            this.autoLogout( expDate );
        }
    }


    logout(){
        this.user.next(null);
        
        //Clear local storage
        localStorage.removeItem(this.USER_DATA);
        
        //Clear timer
        if(this.expirationTimer ){
            clearTimeout(this.expirationTimer);
        }
        this.expirationTimer = null;
        
        //Navigate:
    }

    autoLogout(expirationDuration:number){
        console.log("expo date :Auto login" + expirationDuration);
        this.expirationTimer = setTimeout(() => {
            this.logout();
        },expirationDuration);
    }




    getDecodedToken(token:string):any{

        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
    }

    isAuthenticated(){
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                 resolve(this.loggedIn)
                },200);
            }
        );
        return promise;
    }
    
}