import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/api-response";
import { SellerRequest } from '../models/seller/SellerRequest';
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { URLS } from "../url.constants";


@Injectable({
    providedIn: 'root'
  })
export class SellerAuthService{

    private baseUrl = URLS.apiUrl+"/seller";

    loggedIn:boolean =  false;

    constructor(private _apiService:ApiService){

    }


    login(){
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
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

    //Add Seller
    registerSeller(seller:SellerRequest):Observable<ApiResponse>{
        return this._apiService.post(this.baseUrl, seller);
    }


}