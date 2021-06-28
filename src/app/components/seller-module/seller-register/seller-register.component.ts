import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SellerService } from 'src/app/services/seller.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { SellerRequest } from './../../../models/seller/SellerRequest';
import { LoadingService } from 'src/app/loader/loadingService/loading.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css']
})
export class SellerRegisterComponent implements OnInit {

  isLoading = this._loader.loading$;
  registerSellerData: SellerRequest = new SellerRequest();

  form:FormGroup = new FormGroup({});

  constructor(private _sellerService: SellerService,
              private _router: Router,
              private _loader: LoadingService,
              private _notificationService: NotificationService) { }

  isSellerLoggedIn: boolean;

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', [,
        Validators.required, Validators.minLength(3)
      ]),
      email: new FormControl("", [
        Validators.required,
        // Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      phone: new FormControl('', [
        Validators.pattern("^01[0-9]+$"),
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
    })

  }

  registerSeller(){

    if(this.form.invalid) {
      this._notificationService.onError("Fill In The Form with valid data", 3000, "topRight");
      return;
    };

    console.log(this.form.value);
    this.registerSellerData = this.form.value;
 
    console.log(this.registerSellerData);

    this._sellerService.registerSeller(this.registerSellerData).subscribe(
      resp => {
        console.log(resp.data)
        this._notificationService.onSuccess(resp.message, 3000, "topRight");
        this._router.navigate([`login`]);
      },
      err => {
        console.log(err.data)
        this._notificationService.onError("Seller Already exists", 3000, "topRight");
      });
  }

  get name(){
    return this.form.get('name');
  }

  get email(){
    return this.form.get('email');
  }

  get address(){
    return this.form.get('address');
  }

  get phone(){
    return this.form.get('phone');
  }

  get password(){
    return this.form.get('password');
  }

}
