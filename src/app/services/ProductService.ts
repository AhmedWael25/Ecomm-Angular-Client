import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { URLS } from "../url.constants";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUrl = URLS.apiUrl + "/products";

    constructor(private _apiService: ApiService,
        private _httpClient: HttpClient) {
    }

    //Get All Products
    getAllProducts(): Observable<ApiResponse> {
        return this._apiService.get(this.baseUrl);
    }

    //GetSpecific product
    getProductById(id: number): Observable<ApiResponse> {
        return this._apiService.get(this.baseUrl + "/" + id);
    }

    //Get All Products
    getProducts(page?: number,
        pageSize?: number,
        priceMin?: number,
        priceMax?: number,
        subCategoriesIds?: Array<any>,
        name?: string): Observable<any> {
        
        return this._apiService.get(
            this.baseUrl + "?page=" + page + "&pageSize=" + pageSize);
    }
}