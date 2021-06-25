import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ProductHomeComponent } from './shop/product-home/product-home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaypalComponent } from './paypal/paypal.component';
import { CheckoutProtectionGuard } from 'src/app/guards/checkout-protection.guard';


const routes: Routes = [
  {
    path:"",
    component:LandingPageComponent,
  },
  {
    path:"login",
    component:LoginComponent,
    canActivate:[PreventLoginRegGuard],
  },
  {
    path:"register",
    component:RegisterComponent,
    canActivate:[PreventLoginRegGuard],
  },
  {
    path:"shop",
    component:ProductHomeComponent,
    loadChildren: () => import('../customer-module/shop/shop.module').then(m => m.ShopModule),
    data:{
      role : "ROLE_CUSTOMER",
    },
  },
  {
    path:"profile",
    component:ProfileComponent,
    canActivate:[CustomerAuthGuard],
    data:{
      role : "ROLE_CUSTOMER",
    }
  },
  {
    path:"checkout",
    component:CheckoutComponent,
    canActivate:[CustomerAuthGuard, CheckoutProtectionGuard],
    data:{
      role : "ROLE_CUSTOMER",
    },
  },
  {
    path:"cart",
    component:CartComponent,
    canActivate:[CustomerAuthGuard],
    data:{
      role : "ROLE_CUSTOMER",
    }
  },
  {
    path:"wishlist",
    component:WishlistComponent,
    canActivate:[CustomerAuthGuard],
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
];

@NgModule({
  declarations: [
    CustomerHomeComponent,
    LandingPageComponent,
    RegisterComponent,
    CartComponent,
    WishlistComponent,
    CheckoutComponent,
    PaypalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class CustomerModule { }
