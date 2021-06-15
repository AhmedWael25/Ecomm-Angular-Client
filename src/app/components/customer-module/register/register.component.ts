import { CustomerRequest } from './../../../models/customer/CustomerRequest';
import { CustomerService } from 'src/app/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerCustomerData: CustomerRequest = new CustomerRequest();

  form: FormGroup;

  constructor(private _customerService:CustomerService) { }

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

    this.registerCustomerData.name = this.form.value.name;
    this.registerCustomerData.email = this.form.value.email;
    this.registerCustomerData.address = this.form.value.address;
    this.registerCustomerData.phone = this.form.value.phone;
    this.registerCustomerData.password = this.form.value.password;
    console.log(this.registerCustomerData);

    this._customerService.registerCustomer(this.registerCustomerData).subscribe(
      resp => console.log(resp.data)
    )
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
