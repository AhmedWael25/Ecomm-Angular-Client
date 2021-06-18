import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderHomeComponent } from './orders/order-home/order-home.component';
import { OrdersModule } from '../customer-module/orders/orders.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductHomeComponent } from './shop/product-home/product-home.component';


const routes: Routes = [
  {
    path:"",
    component:LandingPageComponent,
  },
  {
    path:"login",
    component:LoginComponent,
  },
  {
    path:"register",
    component:RegisterComponent,
  },
  {
    path:"shop",
    component:ProductHomeComponent,
    loadChildren: () => import('../customer-module/shop/shop.module').then(m => m.ShopModule),
  },
  {
    path:"orders",
    component:OrderHomeComponent,
    loadChildren: () => import('../customer-module/orders/orders.module').then(m => m.OrdersModule),
  },
  // {
  //   path:"**",
  //   component:LandingPageComponent
  // },
];

@NgModule({
  declarations: [
    CustomerHomeComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class CustomerModule { }
