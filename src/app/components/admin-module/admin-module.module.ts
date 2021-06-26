import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerListComponent } from './seller-list/seller-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AdminAuthGuard } from 'src/app/guards/admin-auth.guard';
import { AdminChartsComponent } from './admin-charts/admin-charts.component';



const routes: Routes = [
  {
    path:"",
    component:AdminChartsComponent,
    canActivate:[AdminAuthGuard],
    data:{
      role : "ROLE_ADMIN",
    },
  },
  { 
    path:"sellers",
    component:SellerListComponent,
    canActivate:[AdminAuthGuard],
    data:{
      role : "ROLE_ADMIN",
    },
  },
  {
    path:"customers",
    component:CustomerListComponent,
    canActivate:[AdminAuthGuard],
    data:{
      role : "ROLE_ADMIN",
    },
  },
  {
    path: "sellers/:sellerId",
    component:SellerDetailsComponent,
    canActivate:[AdminAuthGuard],
    data:{
      role : "ROLE_ADMIN",
    },
  },
  {
    path: "customers/:customerId",
    component:CustomerDetailsComponent,
    canActivate:[AdminAuthGuard],
    data:{
      role : "ROLE_ADMIN",
    },
  },
];

@NgModule({
  declarations: [
    AdminHomeComponent,
    SellerListComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    SellerDetailsComponent,
    AdminChartsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
