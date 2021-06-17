import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { URLS } from "../url.constants";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
  })
export class UploadService{

    private baseUrl = URLS.apiUrl+"/upload";

    constructor(private _apiService:ApiService,
        private _httpClient:HttpClient){}

    uploadFile(file:FormData):Observable<ApiResponse>{
        return this._httpClient.post<ApiResponse>(this.baseUrl, file);
    }

    uploadMultipleFiles(file:FormData):Observable<ApiResponse>{
        return this._httpClient.post<ApiResponse>(this.baseUrl, file, {params:{"multiple":""}});
    }


}