import { LoadingService } from 'src/app/loader/loadingService/loading.service';
import { CustomerRequest } from './../../../models/customer/CustomerRequest';
import { CustomerService } from 'src/app/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = this._loader.loading$;
  registerCustomerData: CustomerRequest = new CustomerRequest();
  
  form:FormGroup = new FormGroup({});

  constructor(private _customerService: CustomerService,
    private _router: Router,
    private _loader: LoadingService,
    private _notificationService: NotificationService) { }

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
    });

  }

  registerCustomer() {

    if(this.form.invalid) {
      this._notificationService.onError("Fill In The Form with valid data", 3000, "topRight");
      return;
    };

    console.log(this.form.value);

    this.registerCustomerData = this.form.value;

    console.log(this.registerCustomerData);

    this._customerService.registerCustomer(this.registerCustomerData).subscribe(
      resp => {
        console.log(resp.data)
        this._notificationService.onSuccess(resp.message, 3000, "topRight");
        this._router.navigate([`login`]);
      },
      err => {
        this._notificationService.onError(err.error.message, 3000, "topRight");
      }
    );

  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get("email");
  }


  get address() {
    return this.form.get('address');
  }

  get phone() {
    return this.form.get('phone');
  }

  get password() {
    return this.form.get('password');
  }

}
