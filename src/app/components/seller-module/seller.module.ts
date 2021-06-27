import { ProductDetailsComponent } from './../shared/product-details/product-details/product-details.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PageControllerComponent } from './../shared/page-controller/page-controller.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderListComponent } from '../customer-module/orders/order-list/order-list.component';
import { SoldItemsComponent } from './sold-items/sold-items.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SellerAuthGuard } from 'src/app/guards/seller-auth.guard';
import { SellerRegisterComponent } from './seller-register/seller-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../shared/login/login.component';
import { PreventLoginRegGuard } from 'src/app/guards/prevent-login-register.guard';
// import {MatTableModule} from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { RatingModule } from 'ng-starrating';
import { BooleanTargetPipe } from 'src/app/pipes/boolean-target.pipe';
import { SellerChartComponent } from './seller-chart/seller-chart.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgToggleModule } from 'ng-toggle-button';

const routes: Routes = [
  {
    path:"",
    component:SellerChartComponent,
    canActivate:[SellerAuthGuard],
    data:{
      role : "ROLE_SELLER"
    },
  },
  {
    path:"inventory",
    component:InventoryComponent,
    canActivate:[SellerAuthGuard],
    data:{
      role : "ROLE_SELLER" 
    },
  },
  {
    path:"register",
    component:SellerRegisterComponent,
    canActivate:[PreventLoginRegGuard],
  },
  {
    path: 'products/:productId',
    component:ProductDetailsComponent,
    canActivate:[SellerAuthGuard],
    data:{
      role : "ROLE_SELLER"
    },
  },
  {
    path: 'add-product',
    component:AddProductComponent,
    canActivate:[SellerAuthGuard],
    data:{
      role : "ROLE_SELLER"
    },
  },
  {
    path: 'sold-items',
    component:SoldItemsComponent,
    canActivate:[SellerAuthGuard],
    data:{
      role : "ROLE_SELLER"
    },
  },
];


@NgModule({
  declarations: [
    SellerHomeComponent,
    AddProductComponent,
    EditProductComponent,
    SoldItemsComponent,
    InventoryComponent,
    SellerRegisterComponent,
    SellerRegisterComponent,
    PageControllerComponent,
    BooleanTargetPipe,
    SellerChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RatingModule,
    MatSlideToggleModule,
  ],
})
export class SellerModule { }
