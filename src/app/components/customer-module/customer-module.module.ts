import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderHomeComponent } from './orders/order-home/order-home.component';
import { OrdersModule } from '../customer-module/orders/orders.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from '../shared/login/login.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  {
    path:"",
    component:LandingPageComponent
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
    component:ShopComponent,
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
    ShopComponent,
    CustomerHomeComponent,
    LandingPageComponent,
    RegisterComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class CustomerModule { }
