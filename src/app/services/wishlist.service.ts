import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/api-response";
import { WishlistProdRequest } from "../models/wishlist/WishlistProdRequest";
import { URLS } from "../url.constants";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";



@Injectable({
    providedIn: 'root'
  })
export class WishListService{


    private customerId:number = 2;
    private baseUrl = URLS.apiUrl+"/customers";


    constructor(private _apiService:ApiService,
                private _authService:AuthService,
                private _httpClient:HttpClient){}


    getCustomerWishList(){
        let customerId = this._authService.getUserId();
        if( customerId <= 0 ) return;
        return this._apiService.get(  this.baseUrl+"/"+this.customerId+"/wishlist"  )    
    }

    addProdToWishlist(request:WishlistProdRequest){
      let customerId = this._authService.getUserId();
      if( customerId <= 0 ) return;
        return this._apiService.post( this.baseUrl+"/"+this.customerId+"/wishlist", request  );
    }

    deleteProdFromWishlist(request:WishlistProdRequest){
      let customerId = this._authService.getUserId();
      if( customerId <= 0 ) return;
      request.customerId = customerId;
      return this._httpClient.request<ApiResponse>("delete", 
      this.baseUrl+"/"+this.customerId+"/wishlist", 
          {
            body:request,
          }
      );
    }



}