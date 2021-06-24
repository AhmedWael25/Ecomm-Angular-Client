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
}
