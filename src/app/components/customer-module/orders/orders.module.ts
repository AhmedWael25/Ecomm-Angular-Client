import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderHomeComponent } from './order-home/order-home.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '', 
    component:OrderListComponent,
  },
  {
    path: ':orderId', 
    component:OrderDetailComponent,
  },
];

@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    OrderHomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class OrdersModule { }
