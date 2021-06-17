import { LoadingService } from 'src/app/loader/loadingService/loading.service';
import { CustomerRequest } from './../../../models/customer/CustomerRequest';
import { CustomerService } from 'src/app/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  isLoading = this._loader.loading$;
  registerCustomerData: CustomerRequest = new CustomerRequest();

  form: FormGroup;

  constructor(private _customerService:CustomerService,
    private _router: Router, private _loader: LoadingService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  
    })

  }

  registerCustomer(){
    console.log(this.form.value);

    this.registerCustomerData = this.form.value;
 
    console.log(this.registerCustomerData);

    this._customerService.registerCustomer(this.registerCustomerData).subscribe(
      resp => console.log(resp.data)
    )
    this._router.navigate([`login`])

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
