import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { addProductRequest } from "../models/product/addProductRequest";
import { ProductReview } from "../models/product/ProductReview";
import { URLS } from "../url.constants";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = URLS.apiUrl + "/products";

  constructor(private _apiService: ApiService,
    private _httpClient: HttpClient) {
  }

  createProduct(request: addProductRequest): Observable<ApiResponse> {
    return this._apiService.post(this.baseUrl, request);
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

  getReviews(id: number): Observable<ApiResponse> {
    return this._apiService.get(this.baseUrl + "/" + id + "/reviews");
  }


  getProdSoldData(prodId:number){
    return this._apiService.get( this.baseUrl + "/" + prodId + "/prodsSoldData" );
  }

  addReview(productId: number, review: ProductReview): Observable<ApiResponse> {
    return this._apiService.post(this.baseUrl + "/" + productId + "/reviews", review);
  }
}