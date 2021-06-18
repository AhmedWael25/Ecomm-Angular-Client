import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerData } from './../../../models/customer/CustomerData';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public _userData:CustomerData;
  public _areFieldsDisabled = true;
  form:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
  });
  constructor(private _profileService:ProfileService) { }

  ngOnInit(): void {
    console.log(this.form);
    this._profileService.getCurretCustomerData().subscribe(resp=>{
      console.log(resp);
      this._userData = resp.data;
    });
  }
  allowEdit(){
    this._areFieldsDisabled = false;
  }
  submit(){
    console.log("submitttttttttttttttttttt");
    this._areFieldsDisabled = true;
    console.log(this.form.value.name);
    console.log(this.form);

    console.log("userDate before");
    console.log(this._userData);

    this._userData.name = this.form.value.name;
    this._userData.address = this.form.value.address;
    this._userData.phone = this.form.value.phone;
    console.log("userDate after");
    console.log(this._userData);
  }
  get name(){
    return this.form.get('name');
  }
  get address(){
    return this.form.get('address');
  }
  get phone(){
    return this.form.get('phone');
  }
}
