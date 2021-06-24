import { SellerProductRequest } from './../models/seller/SellerProductRequest';
import { Observable } from 'rxjs';
import { URLS } from './../url.constants';
import { ApiResponse } from './../models/api-response';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { SellerRequest } from '../models/seller/SellerRequest';



@Injectable({
  providedIn: 'root'
})
export class SellerService {


  baseUrl: string = URLS.apiUrl + "/seller";

  constructor(private _apiService: ApiService) {
  }

  registerSeller(seller: SellerRequest): Observable<ApiResponse> {
    return this._apiService.post(this.baseUrl, seller);
  }

  getInventory(sellerId: number): Observable<ApiResponse> {
    return this._apiService.get(this.baseUrl + "/" + sellerId + "/products");
  }

  getProductDetail(productId: number): Observable<ApiResponse> {
    return this._apiService.get(this.baseUrl + "/products/" + productId);
  }

  updateProduct(sellerProductRequest: SellerProductRequest): Observable<ApiResponse> {
    console.log("Id is " + sellerProductRequest.id);
    return this._apiService.put(this.baseUrl + "/products/" + sellerProductRequest.id, sellerProductRequest);
  }
}
