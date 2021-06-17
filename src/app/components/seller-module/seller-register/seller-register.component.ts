import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerAuthService } from 'src/app/services/seller-auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { SellerRequest } from './../../../models/seller/SellerRequest';


@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css']
})
export class SellerRegisterComponent implements OnInit {

  registerSellerData: SellerRequest = new SellerRequest();

  form: FormGroup;

  constructor(private _sellerAuthService: SellerAuthService,
    private _router: Router) { }

  isSellerLoggedIn: boolean;

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  
    })

  }

  registerSeller(){
    console.log(this.form.value);
    this.registerSellerData = this.form.value;
 
    console.log(this.registerSellerData);

    this._sellerAuthService.registerSeller(this.registerSellerData).subscribe(
      resp => console.log(resp.data)
    )
    this._router.navigate([`seller/login`])
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
