import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/shop/products/products.component';
import { StartPageComponent } from './pages/start/start-page/start-page.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

const routes: Routes = [ 
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'start-page', component: StartPageComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/start-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
