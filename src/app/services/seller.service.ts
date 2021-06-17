import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/api-response";
import { SellerRequest } from '../models/seller/SellerRequest';
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { URLS } from "../url.constants";


@Injectable({
    providedIn: 'root'
  })
export class SellerService{

    private baseUrl = URLS.apiUrl+"/seller";

    constructor(private _apiService:ApiService){

    }

    //Add Seller
    registerSeller(seller:SellerRequest):Observable<ApiResponse>{
        return this._apiService.post(this.baseUrl, seller);
    }


}