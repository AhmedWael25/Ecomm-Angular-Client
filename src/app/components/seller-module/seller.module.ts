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

const routes: Routes = [
  {
    path:"",
    component:InventoryComponent,
    data:{
      role : "ROLE_SELLER" 
    },
  },
  {
    path:"login",
    component:LoginComponent,
    canActivate:[PreventLoginRegGuard],
  },
  {
    path:"register",
    component:SellerRegisterComponent,
  },
  {
    path: 'products/:productId',
    component:EditProductComponent,
    data:{
      role : "ROLE_SELLER" 
    },
  },
  {
    path: 'add-product',
    component:AddProductComponent,
    data:{
      role : "ROLE_SELLER" 
    },
  },
  {
    path: 'sold-items', 
    component:SoldItemsComponent,
    data:{
      role : "ROLE_SELLER" 
    },
  },
  {
    path:':sellerId',
    component: InventoryComponent,
    canActivate:[SellerAuthGuard],
  }
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
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,

    RatingModule,
  ],
})
export class SellerModule { }