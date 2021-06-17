import { CustomerService } from 'src/app/services/customer.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersModule } from './components/customer-module/orders/orders.module';
import { SharedModule } from './components/shared/shared.module';
import { CategoryService } from './services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './loader/interceptor/network.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [CustomerService, { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
