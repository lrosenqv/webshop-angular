import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrderRows } from 'src/app/models/IOrderRows';
import { IProduct } from 'src/app/models/IProduct';
import { ICategory } from 'src/app/models/ICategory';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private allProducts: IProduct[] = [];
  private products = new Subject<IProduct[]>();
  products$ = this.products.asObservable();

  private productsToRender = new Subject<IProduct[]>();
  productsToRender$ = this.productsToRender.asObservable();

  private inStorage = new Subject<IProduct[]>()
  inStorage$ = this.inStorage.asObservable();

  private totalPrice = new Subject<number>();
  totalPrice$ = this.totalPrice.asObservable();

  private categories = new Subject<ICategory[]>();
  categories$ = this.categories.asObservable();

  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  getProducts(){
    this.http
    .get<IProduct[]>(environment.urlApi + 'products')
    .subscribe((dataFromApi) => {
      this.products.next(dataFromApi)
      this.allProducts = dataFromApi;
      this.checkMatches(dataFromApi)
    });
  }

  getCategory(){
    this.http
    .get<ICategory[]>(environment.urlApi + 'categories')
    .subscribe((dataFromApi) => {
      this.categories.next(dataFromApi)
    });
  }

  checkMatches(fromApi: IProduct[]){
    let fromLS: IOrderRows[] = this.storage.loadStorage('inCart')
    let matches = fromApi.filter((product) => {
      return fromLS.some((prod) => {
        return prod.productId === product.id
      });
    });
    this.inStorage.next(matches)
    this.totalPrice.next(this.countTotal(matches))
  }

  countTotal(products: IProduct[]){
    return products.reduce(( previousValue, currentValue ) => previousValue + currentValue.price, 0)
  }

  filterProducts(render: number[]){
    let toRender: IProduct[] = [];
    this.allProducts.filter((product) => {
      product.productCategory.some((item) => {
        render.map(catId => {
          if(item.categoryId === catId){
            toRender.push(product)
            this.productsToRender.next(toRender)
          }
          if(render == null){
            this.getProducts();
          }
        });
      });
    });
  }
}

