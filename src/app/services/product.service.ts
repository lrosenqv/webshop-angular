import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/IProduct';
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

  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  getProducts(){
    this.http
    .get<IProduct[]>(environment.productUrl)
    .subscribe((dataFromApi) => {
      this.products.next(dataFromApi)
      this.checkMatches(dataFromApi);
    });
  }

  checkMatches(fromApi: IProduct[]){
    let fromLS = this.storage.loadStorage('inCart')
    let fromAPI: IProduct[] = [];
    let sum = 0;
    
    for (let i = 0; i < fromLS.length; i++) {
      if(fromApi[i].id = fromLS[i]){
        fromAPI.push(fromApi[i])
        this.inStorage.next(fromAPI)
      }
    }
    sum = this.countTotal(fromAPI)
    this.totalPrice.next(sum)
  }

  countTotal(arr: IProduct[]){
    return arr.reduce(( previousValue, currentValue ) => previousValue + currentValue.price, 0)
  }
}
