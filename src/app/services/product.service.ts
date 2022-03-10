import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrderRows } from '../models/IOrderRows';
import { IProduct } from '../models/IProduct';
import { ICategory } from '../models/ICategory';
import { IOrder } from '../models/IOrder';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = new Subject<IProduct[]>();
  products$ = this.products.asObservable();

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
      this.checkMatches(dataFromApi)
    });
  }

  getCategory(){
    this.http
    .get<ICategory[]>(environment.urlApi + 'categories')
    .subscribe((categories) => {
      this.categories.next(categories)
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
}
