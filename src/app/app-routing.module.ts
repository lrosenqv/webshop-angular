import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/shopping/products/products.component';
import { ShoppingcartComponent } from './pages/shopping-cart/shoppingcart/shoppingcart.component';
import { StartPageComponent } from './pages/home/start-page/start-page.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [ 
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingcartComponent },
  { path: 'start-page', component: StartPageComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/start-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
