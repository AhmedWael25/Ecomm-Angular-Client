import { Product } from './../../../models/product/Product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  oculus: Product;
  userId: String;
  items: Product[];
  featuredIndex1:number;
  featuredIndex2:number;
  featuredProduct1:Product;
  featuredProduct2:Product;


  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
  
    this._productService.getAllProducts().subscribe((data) => {
      this.items = data.data;
      this.oculus = data.data;
      console.log('***************************************************');
      console.log(this.items);

      this.featuredIndex1 =Math.floor(Math.random() * (this.items.length));
      this.featuredIndex2 =Math.floor(Math.random() * (this.items.length));
      this.featuredProduct1 = this.items[this.featuredIndex1];
      this.featuredProduct2 = this.items[this.featuredIndex2];
      
    });
  }

 

}
