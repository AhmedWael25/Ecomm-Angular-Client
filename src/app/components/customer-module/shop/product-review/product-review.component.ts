import { Component, Input, OnInit } from '@angular/core';
import { ProductReview } from 'src/app/models/product/ProductReview';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {

  reviews: Array<ProductReview>;
  p: number = 0;
  totalElements: number;
  ratingPercentages: Array<number> = new Array(5);
  totalRating: number;

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

  constructor(private _productService: ProductService) {
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

        for (let index = 0; index < this.ratingPercentages.length; index++) {
          this.ratingPercentages[index] = Math.round(((this.reviews.filter(function (item) {
            return item.rating == index + 1;
          }).length / this.totalElements * 100) + Number.EPSILON) * 10) / 10;
        }
      }
    );
  }
  onPageChange(event) {
    this.p = event;
  }
}
