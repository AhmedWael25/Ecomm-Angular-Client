import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/product/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit {

  constructor(private _productService: ProductService,
    private _categoryService: CategoryService,
    private _formBuilder: FormBuilder) { }

  products: Array<Product>;
  categories: Array<Category>;
  checkedSubcategories: Map<number, number> = new Map();

  public change(value: boolean, subcategoryId: number) {
    if (value) {
      this.checkedSubcategories.set(subcategoryId, subcategoryId);
    } else {
      this.checkedSubcategories.delete(subcategoryId);
    }
  }

  // Pagination parameters.
  isLoading:boolean = false;
  page: number = 1;
  size: number = 9;
  minPrice: number = 0;
  maxPrice: number = 1000;
  totalPages: number;
  totalElements: number;
  minValue: number = 0;
  maxValue: number = 1000;
  name: string;
  defaultImage: string = "assets/images/product.jpg";
  options: Options = {
    floor: 0,
    ceil: 500,
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

    this.isLoading = true;
    this.page = 1;
    this.minValue = 0;
    this.maxValue = 10000;
    this.minPrice = 0;
    this.maxPrice = 10000;

    this.getProducts();
    this.getCategories();
  }

  resetFilter(){
    this.isLoading = true;
    this.name = "";
    this.page = 1;
    this.minValue = 0;
    this.maxValue = 10000;
    this.minPrice = 0;
    this.maxPrice = 10000;

    this.checkedSubcategories.clear();

    this.getProducts();
    this.getCategories();

  }

  getProducts() {
      let subcategories = Array.from(this.checkedSubcategories.keys());

      this._productService.getProducts(this.page - 1, this.size, this.minPrice, this.maxPrice, subcategories, this.name).subscribe(
        data => {
          this.products = data.data;

          this.totalPages = data.totalPages;
          this.totalElements = data.totalElements;
        }
      );
  }

  show(id){
     let element = document.getElementById(id);
     element.classList.toggle("show");
  }
  
  checkoutForm = this._formBuilder.group({
    name: '',
  });

  onSubmit() {
    this.name = this.checkoutForm.value.name;

    this.getProducts();
  }

  setPage(page: number) {
    this.page = page;

    this.getProducts();
  }

  doFilter() {
    this.page = 1;

    this.getProducts();
  }

  getCategories() {
    this._categoryService.getAll().subscribe(
      data => {
        this.categories = data.data;
      }
      ,err =>{

      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
