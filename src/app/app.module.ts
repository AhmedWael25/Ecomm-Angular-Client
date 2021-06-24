import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersModule } from './components/customer-module/orders/orders.module';
import { SharedModule } from './components/shared/shared.module';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NetworkInterceptor } from './loader/interceptor/network.interceptor';
import { CustomerService } from './services/customer.service';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BooleanTargetPipe } from './pipes/boolean-target.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSliderModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    // SlickCarouselModule,
    SlickCarouselModule,
    NgbModule,
  ],
  providers: [
    CustomerService,
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true }],
  
  bootstrap: [AppComponent]
})
export class AppModule   {



}
