import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { ProductfilterComponent } from './components/productfilter/productfilter.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { ProductHoverDirective } from './directives/product-hover.directive';
import { StartPageComponent } from './components/start-page/start-page.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [AppComponent, ProductsComponent, MainmenuComponent, ProductfilterComponent, ShoppingcartComponent, ProductHoverDirective, StartPageComponent, UserFormComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
