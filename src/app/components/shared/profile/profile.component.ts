import { CustomerImage } from './../../../models/customer/CustomerImage';
import { UploadService } from './../../../services/upload.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerData } from './../../../models/customer/CustomerData';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public _userData: CustomerData = new CustomerData();
  public _areFieldsDisabled = true;
  private file: File;
  public _customerImage: CustomerImage = new CustomerImage();

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
  });
  constructor(
    private _profileService: ProfileService,
    private _uploadService: UploadService
  ) {}

  ngOnInit(): void {
    console.log(this.form);
    this._profileService.getCurretCustomerData().subscribe((resp) => {
      console.log(resp);
      this._userData = resp.data;
    });
  }
  allowEdit() {
    this._areFieldsDisabled = false;
  }
  submit() {
    console.log('submitttttttttttttttttttt');
    this._areFieldsDisabled = true;
    console.log(this.form.value.name);
    console.log(this.form);

    console.log('userDate before');
    console.log(this._userData);

    this._userData.name = this.form.value.name;
    this._userData.address = this.form.value.address;
    this._userData.phone = this.form.value.phone;
    this._profileService
      .updateCustomerData(this._userData)
      .subscribe((resp) => {
        console.log('put response');
        console.log(resp);
      });
    console.log('userDate after');
    console.log(this._userData);
  }
  get name() {
    return this.form.get('name');
  }
  get address() {
    return this.form.get('address');
  }
  get phone() {
    return this.form.get('phone');
  }

  changeImage() {
    console.log('change img');
    document.getElementById('inputImage').click();
  }
  handle(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log(this.file);
      const imageFormData = new FormData();
      imageFormData.append('file',this.file);
      this._uploadService.uploadFile(imageFormData).subscribe(resp=>{
        console.log(resp);
        this._customerImage.image = resp.data;
        this._profileService.updateCustomerImage(this._customerImage.image).subscribe(resp=>{
          console.log(resp);
          this._userData.image = resp.data.image;
          console.log("updating image successfully");
        });
      });
    }
    console.log(event);
    console.log('handleeeeeeeeeeeeee');
  }
}
