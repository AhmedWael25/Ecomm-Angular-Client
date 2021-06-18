import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private _httpClient:HttpClient) { }
  // createHeader(){
  //   let headers=new HttpHeaders().set('token',this._userService.getToken());
  // }
   get(url:string, headers?:HttpHeaders, params?:HttpParams):Observable<ApiResponse>{
    return this._httpClient.get<ApiResponse>(url, {headers:headers, params:params});
   }

   delete(url:string ,headers?:HttpHeaders, params?:HttpParams):Observable<ApiResponse>{
     return this._httpClient.delete<ApiResponse>(url, {headers:headers, params:params});
    }

   post(url:string,obj:any, headers?:HttpHeaders, params?:HttpParams):Observable<ApiResponse>{
     return this._httpClient.post<ApiResponse>(url,obj, {headers:headers, params:params});
    }

   put(url:string,obj:any, headers?:HttpHeaders, params?:HttpParams):Observable<ApiResponse>{
     return this._httpClient.put<ApiResponse>(url,obj, {headers:headers, params:params});
    }
  patch(url:string,obj:any, headers?:HttpHeaders, params?:HttpParams):Observable<ApiResponse>{
    return this._httpClient.put<ApiResponse>(url,obj, {headers:headers, params:params});
    }
}
