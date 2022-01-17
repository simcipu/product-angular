import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { ProductComponent } from './product/product.component';
import {NewProductComponent } from './new-product/new-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { CercaProductComponent } from './cerca-product/cerca-product.component';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './services/route-guard.service';
import { ForbiddenComponent } from './forbidden/forbidden.component';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: 'product', canActivate: [RouteGuardService],
    component: ProductComponent
  },  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },{
   
    path: 'customer/:serialNumber', canActivate: [RouteGuardService],
    component: CustomerComponent
  },{
   
    path: 'product/add', canActivate: [RouteGuardService],
    component: NewProductComponent
  },
  {
   
    path: 'update/product/:serialNumber', canActivate: [RouteGuardService],
    component: UpdateProductComponent
  },
  {
   
    path: 'cerca', canActivate: [RouteGuardService],
    component: CercaProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
