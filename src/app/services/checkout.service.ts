
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { URLS } from "../url.constants";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { CustomerRequest } from "../models/customer/CustomerRequest";

@Injectable({
    providedIn: 'root'
  })
export class CheckoutService{

    private baseUrl = URLS.apiUrl+"/customers";

    constructor(private _apiService:ApiService){

    }

    //Validate CHeckout
    validateCheckout(){
        //TODO REMOVE
        let customerId = 2;
            // let customerId = this._authService.getUserId();
        // if( customerId <= 0 ) return;
        // cartItemRequest.customerId = customerId;
        return this._apiService.get(this.baseUrl + "/" + customerId + "/checkout");
    }

    //Proceed With Payment
    paypalPayment(){
        //TODO REMOVE THIS
        let customerId = 2;
        const paymetMethod = {paymentMethod:"PAYPAL"};
        // let customerId = this._authService.getUserId();
    // if( customerId <= 0 ) return;
    // cartItemRequest.customerId = customerId;
        return this._apiService.post(this.baseUrl + "/" + customerId + "/payment", paymetMethod);
    }


    creditPayment(req:any){
        let customerId = 2;
        // let customerId = this._authService.getUserId();
    // if( customerId <= 0 ) return;
    // cartItemRequest.customerId = customerId;
        return this._apiService.post(this.baseUrl + "/" + customerId + "/payment", req);
    }


}




