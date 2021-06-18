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
  p: number = 0;
  count: number = 10;
  private pages: string;

  ngOnInit(): void {

    this.getProducts();
    // this._productService.getAllProducts().subscribe(resp => {
    //   console.log(resp.data);
    //   this.products = resp.data;
    // });
  }

  getProducts() {
    this._productService.getProducts(this.p).subscribe(
      data => {
        this.products = data.data;

        this.pages = data.headers.get('totalPages');
        
        console.log(this.pages);
      }
    );
  }
}
