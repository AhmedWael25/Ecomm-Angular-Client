import { Product } from './../../../../models/product/Product';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageControllerChangeArgs } from 'src/app/components/shared/page-controller/page-controller.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  PAGE: number = 0;
  SIZE: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  paginationPages: number[] = [];

  page: number = this.PAGE;
  size: number = this.SIZE;
  
  searchName: string;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.loadData(this.page, this.size);
  }


  onPageControllerChange(changeArgs: PageControllerChangeArgs) {
    this.loadData(changeArgs.page, changeArgs.size);
  }

  loadData(page: number, size: number) {
    this._productService.getProducts(page, size,0,2500000,[],null).subscribe(

      resp => {
        console.log(resp);
        this.products = resp.data;

        this.totalElements = resp.totalElements;
        this.totalPages = resp.totalPages;
        this.paginationPages.splice(0);
        for (let i = 1; i <= this.totalPages; i++) {
          this.paginationPages.push(i);
        }
      },
      err => { 
        console.log(err);
      }
    )
  }

}
