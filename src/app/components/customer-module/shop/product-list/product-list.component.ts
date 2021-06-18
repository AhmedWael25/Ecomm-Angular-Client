import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/Product';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private _productService: ProductService) { }

  products: Array<Product>;

  // Pagination parameters.
  page: number;
  size: number = 9;
  totalPages: number;
  totalElements: number;

  ngOnInit(): void {

    this.getProducts(1);

  }

  getProducts(page: number) {
    this.page = page;

    this._productService.getProducts(this.page - 1, this.size).subscribe(
      data => {
        this.products = data.data;

        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
      }
    );
  }
}
