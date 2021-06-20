import { Observable } from 'rxjs';
import { URLS } from './../url.constants';
import { ApiResponse } from './../models/api-response';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SellerService {


  baseUrl:string= URLS.apiUrl+"/seller";

  constructor(private _apiService: ApiService) {
  }

  getInventory(sellerId:number):Observable<ApiResponse>{
    return this._apiService.get(this.baseUrl+"/"+sellerId+"/products");
  }

  getProductDetail(productId:number):Observable<ApiResponse>{
    return this._apiService.get(this.baseUrl + "/products/" + productId);
  }

}
