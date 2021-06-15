import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { URLS } from "../url.constants";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

@Injectable({
    providedIn: 'root'
  })
export class CustomerService{

    private baseUrl = URLS.apiUrl+"/customers";

    constructor(private _apiService:ApiService){

    }

    //Get All Customer Orders
    getCustomerOrders(customerId:number):Observable<ApiResponse>{
        return this._apiService.get( this.baseUrl+"/"+customerId+"/orders" );
    }



}