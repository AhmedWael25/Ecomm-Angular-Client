import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { URLS } from "../url.constants";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
  })
export class OrderService{

    private baseUrl = URLS.apiUrl+"/orders";


    constructor(private _apiService:ApiService){

    }

    
    getOrderDetail(orderId:number):Observable<ApiResponse>{
        return this._apiService.get(this.baseUrl + "/" + orderId);
    }

}