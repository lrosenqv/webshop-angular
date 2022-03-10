import { Component, OnInit } from '@angular/core';
import { IOrderRows } from 'src/app/models/IOrderRows';
import { IProduct } from 'src/app/models/IProduct';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orderList',
  templateUrl: './orderList.component.html',
  styleUrls: ['./orderList.component.scss']
})
export class OrderListComponent implements OnInit {
  productsInCart: IOrderRows[] = [];
  allProducts: IProduct[] = [];

  productsToRender: IProduct[] = [];
  
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

    this.service.getProducts();
    this.storage.getStorage('inCart');
  }

  removeFromCart(productId: number){
    this.productsToRender.splice(productId,1)
    this.productsInCart.splice(productId, 1)
    this.storage.setStorage(this.productsInCart)
    this.service.getProducts();
  }
}
