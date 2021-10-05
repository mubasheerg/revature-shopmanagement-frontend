import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { CustomerLoginComponent } from './component/customer/customer-login/customer-login.component';
import { EditProductComponent } from './component/products/edit-products/edit-product.component';
import { ViewAllProductComponent } from './component/products/view-all-product/view-all-product.component';
import { AddOrderComponent } from './component/order/add-order/add-order.component';
import { EditOrderComponent } from './component/order/edit-order/edit-order.component';
import { ViewAllOrderComponent } from './component/order/view-all-order/view-all-order.component';
import { HomeComponent } from './component/home/home.component';
import { AddProductComponent } from './component/products/add-products/add-product.component';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,CustomerLoginComponent,
    AddOrderComponent,EditOrderComponent,ViewAllOrderComponent,
    AddProductComponent,EditProductComponent,ViewAllProductComponent,
    HomeComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
