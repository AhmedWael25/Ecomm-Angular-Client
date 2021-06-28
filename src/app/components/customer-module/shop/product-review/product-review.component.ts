import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProductReview } from 'src/app/models/product/ProductReview';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {

  reviews: Array<ProductReview> = [];
  p: number = 0;
  pageSize: number = 30;
  totalElements: number;
  ratingPercentages: Array<number> = new Array(5);
  totalStars: number = 0;
  totalRating: number = 0;
  public form: FormGroup;

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  constructor(private _productService: ProductService,
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _customerService: CustomerService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      rating: ['', Validators.required],
      review: ['', Validators.required],
    })
  }

  @Input() id: number;

  ngOnInit(): void {
    this.getReviews(this.id);
  }

  getReviews(id: number) {
    this._productService.getReviews(id).subscribe(
      data => {
        this.reviews = data.data;
        this.totalElements = data.totalElements;
        this.totalStars = 0;

        for (let index = 0; index < this.ratingPercentages.length; index++) {
          let count = this.reviews.filter(function (item) {
            return item.rating == index + 1;
          }).length;

          this.totalStars += count * (index + 1);

          if (count > 0) {
            let percentage = Math.round(((count / this.totalElements * 100) + Number.EPSILON) * 10) / 10;
            this.ratingPercentages[index] = percentage;
          } else {
            this.ratingPercentages[index] = 0;
          }
        }
        this.totalRating = this.totalStars == 0 ? 0 :
          (Math.round((this.totalStars / (this.reviews.length * 5) + Number.EPSILON) * 10) / 10) * 5;
      }
    );
  }

  onPageChange(event) {
    this.p = event;
  }

  addReview() {
    let productReview: ProductReview = new ProductReview();

    if (this.form.valid) {
    productReview.productId = this.id;
    productReview.reviewText = this.form.value.review;
    productReview.createdDate = new Date();
    productReview.userId = this._authService.getUserId();
    productReview.rating = this.form.valid ? this.form.value.rating : 0;
    productReview.rating = this.form.value.rating;

    this._productService.addReview(this.id, productReview).subscribe(
      resp => {
        this._notificationService.onSuccess(resp.message, 3000, "topRight");
        this.getReviews(this.id);
        this.form.controls['review'].setValue('');
        this.form.controls['rating'].setValue('');
      },
      err => {
        let errMsg = err.error.message;
        this._notificationService.onError(errMsg, 3000, "topRight");
      },
    )
    } else {
      this._notificationService.onError("No enough data", 3000, "topRight");
    }
  }
}