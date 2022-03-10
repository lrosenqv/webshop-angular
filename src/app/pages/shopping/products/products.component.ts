import { Component, OnInit } from '@angular/core';
import { IOrderRows } from 'src/app/models/IOrderRows';
import { IProduct } from 'src/app/models/IProduct';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  inCartProducts: IOrderRows[] = [];
  
  constructor(private service: ProductService, private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.service.products$.subscribe((dataFromService: IProduct[]) => { 
      this.products = dataFromService; 
    });

    this.storage.cache$.subscribe((dataFromLS) => {
      this.inCartProducts = dataFromLS;
    });

    this.storage.getStorage('inCart');
    this.service.getProducts();
  }

  addToLS(productAdded: IProduct){
    let productToAdd: IOrderRows = {
      id: 0,
      productId: productAdded.id,
      product: productAdded.name,
      amount: productAdded.price,
      orderId: 0
    }
    this.storage.addToStorage(productToAdd, 'inCart')
  }
}
