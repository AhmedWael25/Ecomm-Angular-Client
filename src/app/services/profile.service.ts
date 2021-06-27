import { CustomerData } from './../models/customer/CustomerData';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { URLS } from './../url.constants';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private baseUrl = URLS.apiUrl + '/customers';
  private  USER_DATA:string ="userData";

  constructor(private _apiService: ApiService,
              private _authService: AuthService,
              private _httpClient:HttpClient) {}

  getCurrentCustomerData():Observable<ApiResponse> {
    return this._apiService.get(this.baseUrl+"/"+this._authService.getUserId());
  }
  updateCustomerData(customerData:CustomerData):Observable<ApiResponse> {
    return this._apiService.put(this.baseUrl+"/"+this._authService.getUserId(),customerData);
  }
  updateCustomerImage(imageUrl:string):Observable<ApiResponse>{

    const body = {
        image: imageUrl,
    }

    return this._httpClient.patch<ApiResponse>(this.baseUrl+"/"+this._authService.getUserId(),body,
      {headers:new HttpHeaders({ 'Content-Type': 'application/json',})} );
  }
}
