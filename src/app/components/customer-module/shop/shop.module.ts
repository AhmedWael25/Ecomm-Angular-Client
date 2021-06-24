import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductReviewComponent } from './product-review/product-review.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
// import { SlickCarouselModule } from 'ngx-slick-carousel';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: ':id',
    component: ProductDetailComponent,
  },
];


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductHomeComponent,
    ProductReviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    NgxSliderModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ShopModule { }
