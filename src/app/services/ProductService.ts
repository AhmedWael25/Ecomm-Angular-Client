import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { URLS } from "../url.constants";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { HttpClient, HttpParams } from "@angular/common/http";

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
        minPrice?: number,
        maxPrice?: number,
        subCategoriesIds?: Array<any>,
        name?: string): Observable<any> {

            name = name == undefined ? '%' : name;

        let params = new HttpParams();
        params = new HttpParams()
            .set('page', String(page))
            .set('name', name)
            .append('priceMin', String(minPrice))
            .append('priceMax', String(maxPrice))
            .append('pageSize', String(pageSize));

        for (let index = 0; index < subCategoriesIds.length; index++) {
            let element = subCategoriesIds[index];
            params = params.append('cat', String(element));
        }

        console.log(this.baseUrl + "?" + params.toString());
        
        return this._apiService.get(this.baseUrl + "?" + params.toString());
    }
}