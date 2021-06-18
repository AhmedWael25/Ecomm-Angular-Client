import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product/Product';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product:Product;

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe(params => {
        let id :number = +params.get('id');
  
        this._productService.getProductById(id).subscribe(response => {
          this.product = response.data;
        });
      });
    }
}
