import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { addProductRequest } from "../models/product/addProductRequest";
import { URLS } from "../url.constants";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
  })
export class ProductService{

  private baseUrl = URLS.apiUrl+"/products";

    constructor(private _apiService:ApiService){

    }

    createProduct(request:addProductRequest):Observable<ApiResponse>{
      return this._apiService.post(this.baseUrl, request);
    }

    

}