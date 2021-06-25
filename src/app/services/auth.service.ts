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
import { take, exhaustMap } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = URLS.apiUrl + "/login";
    private USER_DATA: string = "userData";
    private expirationTimer: any;

    constructor(private _apiService: ApiService,
        private _router: Router) { }

    //TODO REFACTOR
    loggedIn: boolean = false;
    user = new BehaviorSubject<UserAuthInfo>(null);

    sellerId: number = 1;
    role: string = "";


    isCustomer(): boolean {
        if (this.user.value == null) return false;
        return this.user.value.role === "ROLE_CUSTOMER" ? true : false;
    }
    isSeller(): boolean {
        if (this.user.value == null) return false;
        return this.user.value.role === "ROLE_SELLER" ? true : false;

    }
    isAdmin(): boolean {
        if (this.user.value == null) return false;
        return this.user.value.role === "ROLE_ADMIN" ? true : false;
    }
    getUserId(): number {
        if (this.user.value == null) return -1;
        return this.user.value.id;
    }

     async attemptLogin(loginRequest: LoginRequest):Promise<boolean> {
         let loggedIn:boolean = false;

    //    await  this._apiService.post(this.baseUrl, loginRequest).toPromise();
        await this._apiService.post(this.baseUrl, loginRequest).toPromise().then(
            resp => {
                loggedIn= true;
                this.loggedIn = true;
                let authResp:AuthResponse = resp.data;
                this.handleAuthentication(authResp);
            })
            .catch( err => {
                // console.log("err"+err);
                loggedIn = false;
                this.loggedIn = false;
            })
            .finally( () =>{
                // console.log("fin"+ this.loggedIn);
                // console.log("in finaly");
                return loggedIn;
            });
            return loggedIn;

        //  this._apiService.post(this.baseUrl, loginRequest).toPromise.subscribe(
        //         resp => {
        //             console.log(resp);
        //             let authResp:AuthResponse = resp.data;

        //             this.handleAuthentication(authResp);
        //             this.loggedIn = true;
        //         },
        //         err => {
        //             this.loggedIn = false;
        //         },
        //         () =>{
        //             return this.loggedIn;
        //         }
        //     );       
        //     return this.isAuthenticated(); 
    }


    handleAuthentication(authResponse: AuthResponse) {

        let token = authResponse.jwt;
        let decodedToken: DecodedToken = this.getDecodedToken(token);


        const expDurationInSeconds = +decodedToken.exp - +decodedToken.iat;
        const expDate = new Date(new Date().getTime() + expDurationInSeconds * 1000);
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
        localStorage.setItem(this.USER_DATA, JSON.stringify(userData));

    }

    autoLogin() {

        const userData: { id: number, email: string, role: string, _jwt: string, _jwtExpireDate: string } = JSON.parse(localStorage.getItem(this.USER_DATA));

        if (!userData) {
            return;
        }

        const loadedUser = new UserAuthInfo(userData.id, userData.email, userData.role, userData._jwt, new Date(userData._jwtExpireDate));

        console.log("loadedUser" + loadedUser);


        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expDate = new Date(userData._jwtExpireDate).getTime() - new Date().getTime();
            this.autoLogout(expDate);
        }
    }


    logout() {
        this.user.next(null);

        //Clear local storage
        localStorage.removeItem(this.USER_DATA);

        //Clear timer
        if (this.expirationTimer) {
            clearTimeout(this.expirationTimer);
        }
        this.expirationTimer = null;

        //Navigate:
        this._router.navigateByUrl("/login");
    }

    autoLogout(expirationDuration: number) {
        console.log("expo date :Auto login" + expirationDuration);
        this.expirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    getDecodedToken(token: string): any {

        try {
            return jwt_decode(token);
        }
        catch (Error) {
            return null;
        }
    }

    isAuthenticated() {
        return this.user.value != null ? true : false;
    }

}