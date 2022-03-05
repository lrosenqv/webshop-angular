import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {
  productsInCart: number[] = [];
  allProducts: IProduct[] = [];

  productsToRender: IProduct[] = [];
  totalPrice: number = 0;

  constructor(private service: ProductService, private storage: LocalStorageService) {}

  ngOnInit(): void {
    this.service.products$.subscribe((dataFromService) => { 
      this.allProducts = dataFromService; 
    });

    this.storage.cache$.subscribe((dataFromLS) => {
      this.productsInCart = dataFromLS;
    });

    this.service.inStorage$.subscribe((matchedDataFrService) => {
      this.productsToRender = matchedDataFrService;
    });

    this.service.totalPrice$.subscribe((sumFromService) => {
      this.totalPrice = sumFromService;
      console.log(this.totalPrice);
    })

    this.service.getProducts();
    this.storage.getStorage();
  }

  removeFromCart(productIndex: number){
    let updatedCart = this.productsInCart
    updatedCart.splice(productIndex,1)

    this.storage.setStorage(updatedCart)
  }
}
