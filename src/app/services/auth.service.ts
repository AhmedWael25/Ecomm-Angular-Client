import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LoginRequest } from "../models/login/loginRequest";
import { UserAuthInfo } from "../models/login/UserAuthInfo";
import { URLS } from "../url.constants";

@Injectable({
    providedIn: 'root'
  })
export class AuthService{

    private baseUrl = URLS.apiUrl +"/login";

    //TODO REFACTOR
    loggedIn:boolean =  true;

    user = new Subject<UserAuthInfo>();

    sellerId:number  = 1;
    role:string = "";

    login(){
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }

    isCustomer():boolean{
        return this.role === "ROLE_CUSTOMER" ? true : false;
    }
    isSeller():boolean{
        return this.role === "ROLE_SELLER" ? true : false;
    }
    isAdmin():boolean{
        return this.role === "ROLE_ADMIN" ? true : false;
    }

    attemptLogin(loginRequest:LoginRequest):boolean{
        
        //if success
        //create new UserAuthInfo from response data 
        //emit the user
        this.user.next


        return true;
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