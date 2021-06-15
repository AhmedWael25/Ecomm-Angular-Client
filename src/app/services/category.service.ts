import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { URLS } from "../url.constants";
import { ApiService } from "./api.service";


@Injectable({
    providedIn: 'root'
  })
export class CategoryService{

    private baseUrl = URLS.apiUrl+"/categories";


    constructor(public _apiService:ApiService){
    }

    getAll():Observable<ApiResponse>{
        return this._apiService.get(this.baseUrl);
    }

    getSubCategories(categoryId:number):Observable<ApiResponse>{
        return this._apiService.get(this.baseUrl+"/"+categoryId);
    }

     
    //    delete(categoryId:number):Observable<ApiResponse>{
    //      return this._apiService.delete(this.baseUrl+"/"+categoryId);
    //     }
        
    //    post(obj:any):Observable<ApiResponse>{
    //      return this._apiService.post(this.baseUrl, obj);
    //     }
        
    //    put(url:string,obj:any):Observable<any>{
    //      return this._apiService.put(this.baseUrl,obj);
    //     }



}