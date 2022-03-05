import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { StartPageComponent } from './components/start-page/start-page.component';

const routes: Routes = [ 
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingcartComponent },
  { path: 'start-page', component: StartPageComponent },
  { path: '', redirectTo: '/start-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
