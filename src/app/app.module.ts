import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProductComponent } from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { CustomerComponent } from './customer/customer.component';
import { NewProductComponent } from './new-product/new-product.component';
import {FormsModule} from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';
import { CercaProductComponent } from './cerca-product/cerca-product.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ErrorInterceptor } from './services/error.interceptor';
import { TokenExpComponent } from './token-exp/token-exp.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductComponent,
    CustomerComponent,
    NewProductComponent,
    UpdateProductComponent,
    CercaProductComponent,
    LoginComponent,
    ForbiddenComponent,
    TokenExpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSliderModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
     
    }, 
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
