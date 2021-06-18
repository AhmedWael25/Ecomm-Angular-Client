import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaxLengthPipe } from 'src/app/pipes/max-length.pipe';
import { AllowCharOnlyDirective } from 'src/app/directives/allow-char-only.directive';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';





@NgModule({
  declarations: [
     MenuComponent
    ,MaxLengthPipe,AllowCharOnlyDirective, FooterComponent, PageNotFoundComponent,
  ],
  imports: [
  CommonModule,FormsModule,
    ReactiveFormsModule,RouterModule,HttpClientModule,
  ],
  exports:[MenuComponent,MaxLengthPipe,FormsModule,
    ReactiveFormsModule,HttpClientModule,AllowCharOnlyDirective,
  FooterComponent,]
})
export class SharedModule { }
