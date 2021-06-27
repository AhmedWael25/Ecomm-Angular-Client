import { CustomerImage } from './../../../models/customer/CustomerImage';
import { UploadService } from './../../../services/upload.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerData } from './../../../models/customer/CustomerData';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Wishlist } from 'src/app/models/wishlist/Wishlist';
import { WishListService } from 'src/app/services/wishlist.service';
import { WishlistProdRequest } from 'src/app/models/wishlist/WishlistProdRequest';
import { NotificationService } from 'src/app/services/notification.service';

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

  wishlist: Wishlist = new Wishlist();
  isLoading: boolean = false;
  isError: boolean = false;

  form: FormGroup;

  constructor(
    private _profileService: ProfileService,
    private _uploadService: UploadService,
    private _wishlistService: WishListService,
    private _notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    // console.log(this.form);
    this._profileService.getCurrentCustomerData().subscribe((resp) => {
      console.log(resp);
      this._userData = resp.data;

      this.form = new FormGroup({
        name: new FormControl(this._userData.name, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
        address: new FormControl(this._userData.address, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
        phone: new FormControl(this._userData.phone, [
          Validators.pattern("01[0-9]+"),
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      });
    });

    this.isLoading = true;
    this._wishlistService.getCustomerWishList().subscribe(
      resp => {
        this.wishlist = resp.data;
      },
      err => {
        console.log(err);
      },
      () => {
        this.isLoading = false;
      }
    );
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

    this._profileService.updateCustomerData(this._userData).subscribe(
      resp => {
        console.log("outside true response" + JSON.stringify(resp));

        if (resp.data != null) {
          console.log("inside true response");
          this.onUpdatedSuccess();
        }
      },
      err => {
        console.log(err);
        this.onUpdatedError();
      }
    );
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
      imageFormData.append('file', this.file);
      this._uploadService.uploadFile(imageFormData).subscribe(resp => {
        console.log(resp);
        this._customerImage.image = resp.data;
        this._profileService.updateCustomerImage(this._customerImage.image).subscribe(resp => {
          console.log(resp);
          this._userData.image = resp.data.image;
          console.log("updating image successfully");
        });
      });
    }
    console.log(event);
    console.log('handleeeeeeeeeeeeee');
  }

  //#################################################################

  deleteItem(index, event) {

    console.log(index);

    let item = this.wishlist.products[index];

    let req = new WishlistProdRequest();
    req.productId = item.id;
    //TODO REMOV THIS
    req.customerId = 0;

    this._wishlistService.deleteProdFromWishlist(req).subscribe(
      resp => {
        console.log(resp.data);

        if (resp.data == true) {
          this.wishlist.products.splice(index, 1);
          this._notificationService.onSuccess(resp.message, 3000, "topRight");
        }
      },
      err => {
        console.log(err);
        this._notificationService.onError("Something Wrong happened, Try Again Later", 3000, "topRight");
      }

    );
  }

  onUpdatedSuccess() {
    return this._notificationService.onSuccess('profile is updated', 3000, "topRight");
  }

  onUpdatedError() {
    return this._notificationService.onError(' failed to update profile!', 3000, "topRight");
  }
}


