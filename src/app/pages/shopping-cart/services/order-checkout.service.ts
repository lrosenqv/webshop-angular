import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderRows } from 'src/app/models/IOrderRows';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { IOrder } from 'src/app/models/IOrder'; 
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderCheckoutService {
  private orders = new Subject<IOrder[]>();
  orders$ = this.orders.asObservable();

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  getOrdersDB(): Observable<IOrder[]>{
    this.http
    .get<IOrder[]>(environment.urlApi + 'orders')
    .subscribe((ordersFromDB) => {
      this.orders.next(ordersFromDB)
      console.log(ordersFromDB);
      return ordersFromDB
    });
    return this.orders
  }

  orderBuild(userDetails: IOrder): Observable<any>{
    let cart: IOrderRows[] = this.storage.loadStorage('inCart');
    cart.forEach((product) => {
      userDetails.orderRows.push(product);
    });

    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(userDetails)
    
    this.storage.removeStorage('inCart')
    return this.http.post(environment.urlApi + 'orders', body, {'headers': headers});
  }
}
