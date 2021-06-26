import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { URLS } from '../url.constants';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl:string= URLS.apiUrl+"/admin";

  constructor(private _apiService: ApiService) { }

  getAllSellers():Observable<ApiResponse>{
    return this._apiService.get(URLS.apiUrl + "/seller");
  }

  getAllCustomers():Observable<ApiResponse>{
    return this._apiService.get(URLS.apiUrl + "/customers");
  }

  getSellerDetails(sellerId:number):Observable<ApiResponse>{
    return this._apiService.get(URLS.apiUrl + "/seller/" + sellerId);
  }

  getCustomerDetails(customerId:number):Observable<ApiResponse>{
    return this._apiService.get(URLS.apiUrl + "/customers/" + customerId + "/details");
  }

  getSoldItems(sellerId:number):Observable<ApiResponse>{
    // let sellerId = this._authService.getUserId();
   if( sellerId <= 0 ) return;
   return this._apiService.get(URLS.apiUrl + "/seller/" + sellerId + "/sold-items");
 }

 getAllSoldItems():Observable<ApiResponse>{
   return this._apiService.get(URLS.apiUrl + "/products/sold-items");
 }

}
