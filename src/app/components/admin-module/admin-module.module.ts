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



const routes: Routes = [
  { 
    path:"sellers",
    component:SellerListComponent,
  },
  {
    path:"customers",
    component:CustomerListComponent,
  },
  {
    path: "sellers/:sellerId",
    component:SellerDetailsComponent,
  },
  {
    path: "customers/:customerId",
    component:CustomerDetailsComponent,
  },
];

@NgModule({
  declarations: [
    AdminHomeComponent,
    SellerListComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    SellerDetailsComponent,
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
