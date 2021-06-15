import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
   get(url:string):Observable<ApiResponse>{
    return this._httpClient.get<ApiResponse>(url);
   }
  
 
   delete(url:string):Observable<ApiResponse>{
     return this._httpClient.delete<ApiResponse>(url);
    }
    
   post(url:string,obj:any):Observable<ApiResponse>{
     return this._httpClient.post<ApiResponse>(url,obj);
    }
    
   put(url:string,obj:any):Observable<ApiResponse>{
     return this._httpClient.put<ApiResponse>(url,obj);
    }
}
