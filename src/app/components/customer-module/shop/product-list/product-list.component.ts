import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from 'src/app/models/product/Product';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit {

  constructor(private _productService: ProductService) { }

  products: Array<Product>;

  // Pagination parameters.
  page: number = 1;
  size: number = 9;
  minPrice: number = 0;
  maxPrice: number = 1000;
  totalPages: number;
  totalElements: number;
  minValue: number = 0;
  maxValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.minPrice = value;
          return "<b>Min :</b> $" + value;
        case LabelType.High:
          this.maxPrice = value;
          return "<b>Max :</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };

  ngOnInit(): void {

    this.page = 1;
    this.minValue = 0;
    this.maxValue = 10000;
    this.minPrice = 0;
    this.maxPrice = 10000;

    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts(this.page - 1, this.size, this.minPrice, this.maxPrice).subscribe(
      data => {
        this.products = data.data;

        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
      }
    );
  }

  setPage(page: number) {
    this.page = page;

    this.getProducts();
  }

  doFilter() {
    this.page = 1;

    this.getProducts();
  }
}
