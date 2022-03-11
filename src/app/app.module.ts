import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/pages/shop/products/products.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { ProductfilterComponent } from './components/pages/shop/productfilter/productfilter.component';
import { OrderListComponent } from './components/pages/shopping-cart/orderList/orderList.component';
import { StartPageComponent } from './components/pages/start/start-page/start-page.component';
import { UserFormComponent } from './components/pages/shopping-cart/user-form/user-form.component';
import { ShoppingCartComponent } from './components/pages/shopping-cart/shopping-cart.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { LogoutBtnComponent } from './components/logout-btn/logout-btn.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent, ProductsComponent, MainmenuComponent, ProductfilterComponent, OrderListComponent, StartPageComponent, UserFormComponent, ShoppingCartComponent, AdminComponent, LoginComponent, LoginFormComponent, LogoutBtnComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
