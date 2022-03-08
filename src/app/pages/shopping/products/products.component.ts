import { Component, OnInit } from '@angular/core';
import { IProdInOrder } from 'src/app/models/IProdInOrder';
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
  inCartProducts: IProdInOrder[] = [];
  
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
    let productToAdd: IProdInOrder = {
      productId: productAdded.id,
      product: productAdded.name,
      amount: productAdded.price
    }
    this.storage.addToStorage(productToAdd, 'inCart')
  }
}
