import { Product } from './../../../../models/product/Product';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[];

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){

    this._productService.getAllProducts().subscribe(response => {
      console.log(response);
      this.products = response.data;
      console.log("Products : " + JSON.stringify(this.products));

    });
  }

}
