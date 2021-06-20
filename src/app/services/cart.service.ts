import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/api-response";
import { CartItemRequest } from "../models/cart/CartItemRequest";
import { URLS } from "../url.constants";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
  })
export class CartService{

    private customerId:number = 2;
    private baseUrl = URLS.apiUrl+"/customers";


    constructor(private _apiService:ApiService,
                private _authService:AuthService,
                private _httpClient:HttpClient){}


    getCartItems(){
        // let customerId = this._authService.getUserId();
        // if( customerId <= 0 ) return;
        return this._apiService.get( this.baseUrl+"/"+this.customerId+"/carts" );
    }

    addCartItem(cartItemRequest:CartItemRequest){
        // let customerId = this._authService.getUserId();
        // if( customerId <= 0 ) return;
        // cartItemRequest.customerId = customerId;
        return this._apiService.post( this.baseUrl+"/"+this.customerId+"/carts", cartItemRequest );
    }

    deleteCartItem(cartItemRequest:CartItemRequest){
        // let customerId = this._authService.getUserId();
        // if( customerId <= 0 ) return;
        // cartItemRequest.customerId = customerId;
         return this._httpClient.request<ApiResponse>("delete", 
         this.baseUrl+"/"+this.customerId+"/carts", 
            {
              body:cartItemRequest,
            }
        );
    }

    updateCartItem(cartItemRequest:CartItemRequest){
        // let customerId = this._authService.getUserId();
        // if( customerId <= 0 ) return;
        // cartItemRequest.customerId = customerId;
        return this._apiService.put( this.baseUrl+"/"+this.customerId+"/carts", cartItemRequest );
    }

    
}