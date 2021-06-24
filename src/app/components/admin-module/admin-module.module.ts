import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerListComponent } from './seller-list/seller-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';



const routes: Routes = [
  { 
    path:"sellers",
    component:SellerListComponent,
  },
  {
    path:"customers",
    component:CustomerListComponent,
  }
];

@NgModule({
  declarations: [
    AdminHomeComponent,
    SellerListComponent,
    CustomerListComponent,
    
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
