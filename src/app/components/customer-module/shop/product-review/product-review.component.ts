import { Component, OnInit } from '@angular/core';
import { ProductReview } from 'src/app/models/product/ProductReview';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {

  reviews: Array<ProductReview>;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
  }

  getReviews(id: number) {
    this._productService.getReviews(id).subscribe(
      data => {
        this.reviews = data.data;
      }
    );
  }

}
