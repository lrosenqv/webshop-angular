import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/shopping/products/products.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { ProductfilterComponent } from './pages/shopping/components/productfilter/productfilter.component';
import { OrderListComponent } from './pages/shopping-cart/orderList/orderList.component';
import { ProductHoverDirective } from './directives/product-hover.directive';
import { StartPageComponent } from './pages/home/start-page/start-page.component';
import { UserFormComponent } from './pages/shopping-cart/user-form/user-form.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { LogoutBtnComponent } from './components/logout-btn/logout-btn.component';
import { PlaceholderDirective } from './directives/placeholder.directive';

@NgModule({
  declarations: [AppComponent, ProductsComponent, MainmenuComponent, ProductfilterComponent, OrderListComponent, ProductHoverDirective, StartPageComponent, UserFormComponent, ShoppingCartComponent, AdminComponent, LoginComponent, LoginFormComponent, LogoutBtnComponent, PlaceholderDirective],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
