import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/ICategory';
import { IOrderRows } from 'src/app/models/IOrderRows';
import { IProduct } from 'src/app/models/IProduct';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { ProductService } from 'src/app/services/productService/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  inCartProducts: IOrderRows[] = [];
  public categories: ICategory[] = [];

  constructor(private service: ProductService, private storage: LocalStorageService) { }

  ngOnInit(): void {
    /*this.service.products$.subscribe((dataFromService: IProduct[]) => {
      this.products = dataFromService;
    });*/

    this.service.productsToRender$.subscribe((products) => {
      this.products = products;
    });

    this.service.categories$.subscribe((dataFromService) => {
      this.categories = dataFromService;
      this.products.forEach(product => {
        product.productCategory.map((pr) => {
          if(pr.categoryId === 5){
            pr.category = "Action"
          } else if(pr.categoryId === 6){
            pr.category = "Thriller"
          } else if(pr.categoryId === 7){
            pr.category = "Comedy"
          } else {
            pr.category = "Sci-fi"
          }
        })
      })
    });

    this.storage.cache$.subscribe((dataFromLS) => {
      this.inCartProducts = dataFromLS;
    });

    this.service.getProducts();
    this.service.getCategory();
    this.storage.getStorage('inCart');
  }

  addToLS(productAdded: IProduct){
    let productToAdd: IOrderRows = {
      productId: productAdded.id,
      product: null,
      amount: productAdded.price
    }
    this.storage.addToStorage(productToAdd, 'inCart')
  }
}
