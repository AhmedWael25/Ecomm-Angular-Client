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
import { PreventLoginRegGuard } from 'src/app/guards/prevent-login-register.guard';
import { CustomerAuthGuard } from 'src/app/guards/customer-auth.guard';
import { ProfileComponent } from '../shared/profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
  {
    path:"",
    component:LandingPageComponent
  },
  {
    path:"login",
    component:LoginComponent,
    canActivate:[PreventLoginRegGuard],
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
    path:"profile",
    component:ProfileComponent,
    data:{
      role : "ROLE_CUSTOMER",
    }
  },
  {
    path:"cart",
    component:CartComponent,
    data:{
      role : "ROLE_CUSTOMER",
    }
  },
  {
    path:"wishlist",
    component:WishlistComponent,
    data:{
      role : "ROLE_CUSTOMER",
    }
  },
  {
    path:"orders",
    component:OrderHomeComponent,
    loadChildren: () => import('../customer-module/orders/orders.module').then(m => m.OrdersModule),
    canActivate:[CustomerAuthGuard],
    data:{
      role : "ROLE_CUSTOMER",
    }
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
    WishlistComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class CustomerModule { }
