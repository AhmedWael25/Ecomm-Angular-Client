
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { URLS } from "../url.constants";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { CustomerRequest } from "../models/customer/CustomerRequest";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
export class CheckoutService{

    private baseUrl = URLS.apiUrl+"/customers";

    constructor(private _apiService:ApiService,
                private _authService:AuthService){

    }

    //Validate CHeckout
    validateCheckout(){
        //TODO REMOVE
        let customerId = this._authService.getUserId();
        if( customerId <= 0 ) return;
        return this._apiService.get(this.baseUrl + "/" + customerId + "/checkout");
    }

    //Proceed With Payment
    paypalPayment(){
        const paymetMethod = {paymentMethod:"PAYPAL"};
        let customerId = this._authService.getUserId();
        if( customerId <= 0 ) return;
        return this._apiService.post(this.baseUrl + "/" + customerId + "/payment", paymetMethod);
    }


    creditPayment(req:any){
        let customerId = this._authService.getUserId();
        if( customerId <= 0 ) return;
        return this._apiService.post(this.baseUrl + "/" + customerId + "/payment", req);
    }


}




