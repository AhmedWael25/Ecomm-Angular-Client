import { Observable } from 'rxjs';
import { URLS } from './../url.constants';
import { ApiResponse } from './../models/api-response';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {


  baseUrl:string= URLS.apiUrl+"/seller";

  constructor(private _apiService: ApiService) {
  }

  get(sellerId:number,page:number,size:number):Observable<ApiResponse>{

    return this._apiService.get(this.baseUrl+"/"+sellerId+"/procucts?page="+page+"&size="+size);



  }



}
