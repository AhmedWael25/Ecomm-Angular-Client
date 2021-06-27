import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/models/category/Category';
import { SubCategory } from 'src/app/models/category/SubCategory';
import { addProductRequest } from 'src/app/models/product/addProductRequest';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

   addProductForm:FormGroup = new FormGroup({});
   categories:Array<Category>;
   subCategories:Array<SubCategory>;

   selectedCategory:Category;
   selectedSubCategory:SubCategory;

   request:addProductRequest = new addProductRequest;


   images:string[] = [];
   mainImg:string = "";

   fileList:FileList;
   file:File;

   isLoading:boolean = false;
  

  constructor(private _categoryService:CategoryService,
              private _uploadService:UploadService,
              private _productService:ProductService,
              private _authService:AuthService) {

   }

  ngOnInit(): void {

    this._categoryService.getAll().subscribe(resp => {
      this.categories = resp.data;
      this.subCategories = this.categories[0].subCategories;
     });
  

    this.addProductForm = new FormGroup({
    name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(60),
        Validators.minLength(5),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1000),
        Validators.minLength(10),
      ]),
      quantity: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$"),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+(\\.\\d{1,2})?$"),    
    ]),
    categoryGroup : new FormGroup({
        category: new FormControl(null, [Validators.required]),
        subcategory : new FormControl(null, [Validators.required]),
      }),
      imagesGroup: new FormGroup({
        mainImage: new FormControl(null, [Validators.required]),
        catalogImages : new FormControl(null, [Validators.required]), 
      }),
    });
  }
  

  getName(){
    return this.addProductForm.get("name");
  }
  getDescription(){
    return this.addProductForm.get("description");
  }
  getQuantity(){
    return this.addProductForm.get("quantity");
  }
  getPrice(){
    return this.addProductForm.get("price");
  }
  getCategory(){
    return this.addProductForm.get("categoryGroup.category");
  }
  getSubCategory(){
    return this.addProductForm.get("categoryGroup.subcategory");
  }
  getMainImg(){
    return this.addProductForm.get("imagesGroup.mainImage");
  }
  getCatalog(){
    return this.addProductForm.get("imagesGroup.catalogImages");
  }


  onImagePick(event) {

    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log(this.file);
      this.addProductForm.get("imagesGroup.mainImage").setValue(this.file, {emitModelToViewChange: true});
    }

  }
  onCatalogPick(event){
    if (event.target.files.length > 0) {
      this.fileList = event.target.files
      console.log(this.fileList);
      this.addProductForm.get("imagesGroup.catalogImages").setValue(this.fileList, {emitModelToViewChange: true});
    }
  }

  onSubmit(){

    if(!this.addProductForm.valid){
      return;
    }

    this.isLoading = true;

    this.request.productName = this.addProductForm.value.name;
    this.request.productDescription = this.addProductForm.value.description;
    this.request.productPrice = this.addProductForm.value.price;
    this.request.productQuantity = +this.addProductForm.value.quantity;
    this.request.subcategoryId = +this.addProductForm.value.categoryGroup.subcategory;
    this.request.sellerId = +this._authService.getUserId();

    console.log( this.request );

    const imageFormData = new FormData();
    const catalogFormData = new FormData();
    
    imageFormData.append('file',this.file);
    for (var i = 0; i < this.fileList.length; i++) { 
      catalogFormData.append("files", this.fileList[i]);
    }

    forkJoin([
      this._uploadService.uploadFile(imageFormData),
      this._uploadService.uploadMultipleFiles(catalogFormData),
    ]).subscribe(  ([res1, res2]) =>{ 
      console.log("1");
      this.request.productImg = res1.data;
      this.request.prodImages = res2.data;
      this.isLoading = false; 
      console.log(this.request)
        //If Success Redirect Into The Product Detail Page OR The
      this.sendProductRequest();
    });

  }

  sendProductRequest(){
    this._productService.createProduct(this.request).subscribe(resp =>{
      console.log(resp);
      this.addProductForm.reset();
    });
  }

  onAddCategoryImage(){
    const control = new FormControl(null);
    (<FormArray>this.addProductForm.get("imagesGroup.catalog")).push( control );
  }

  getControls() {
    return (<FormArray>this.addProductForm.get('imagesGroup.catalog')).controls;
  }

  removeCategoryImage(index:number){

    const formArr:FormArray =  this.addProductForm.get("imagesGroup.catalog") as FormArray;
    const formGp:FormGroup =  formArr.get("0") as FormGroup;
    formArr.controls.splice(index, 1);
  }

  onCategoryChange(categoryValue){

    this.categories.forEach( (cat, index) => {
      if(cat.id == categoryValue){
        this.subCategories = cat.subCategories;
      }
    } );
  }






}
