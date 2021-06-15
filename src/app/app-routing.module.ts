import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerHomeComponent } from './components/customer-module/customer-home/customer-home.component';
import { OrderDetailComponent } from './components/customer-module/orders/order-detail/order-detail.component';
import { OrderHomeComponent } from './components/customer-module/orders/order-home/order-home.component';
import { OrderListComponent } from './components/customer-module/orders/order-list/order-list.component';
import { OrdersModule } from './components/customer-module/orders/orders.module';
import { SellerHomeComponent } from './components/seller-module/seller-home/seller-home.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { SellerAuthGuard } from './guards/seller-auth.guard';

//Main Routes in Application
const routes: Routes = [
  {
    path: '', 
    component:CustomerHomeComponent,
    loadChildren: () => import('./components/customer-module/customer-module.module').then(m => m.CustomerModule),

    // children:[
    //   {path: "", component:OrderListComponent},
    //   { path: ":orderId", component:OrderDetailComponent }
    // ]
  },
  {
    path: 'seller', 
    component:SellerHomeComponent,
    // canActivate: [SellerAuthGuard],
    // canActivateChild:[SellerAuthGuard],
    loadChildren: () => import('./components/seller-module/seller.module').then(m => m.SellerModule),
  },
  {
    path:"404",
    component:PageNotFoundComponent,
    data:{messgae:"404 - Page Not Found"}
  },
  {
    path:"**",
    redirectTo:"/404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
