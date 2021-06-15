import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderListComponent } from '../customer-module/orders/order-list/order-list.component';
import { SoldItemsComponent } from './sold-items/sold-items.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerAuthGuard } from 'src/app/guards/seller-auth.guard';
import { SellerRegisterComponent } from './seller-register/seller-register.component';

const routes: Routes = [
  {
    path:"",
    component:InventoryComponent,
    canActivate:[SellerAuthGuard],
  },
  {
    path:"login",
    component:SellerLoginComponent,
  },
  {
    path:"register",
    component:SellerRegisterComponent,
  },
  {
    path: 'edit-product', 
    component:EditProductComponent,
    canActivate:[SellerAuthGuard],
  },
  {
    path: 'add-product', 
    component:AddProductComponent,
    canActivate:[SellerAuthGuard],
  },
  {
    path: 'sold-items', 
    component:SoldItemsComponent,    
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
    SellerLoginComponent,
    SellerRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SellerModule { }
