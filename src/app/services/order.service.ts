import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderRows } from 'src/app/models/IOrderRows';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { IDBOrder } from '../models/IDBOrder';
import { IOrder } from '../models/IOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = new Subject<IOrder[]>();
  orders$ = this.orders.asObservable();

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  getOrdersDB(): Observable<IOrder[]>{
    this.http
    .get<IOrder[]>(environment.urlApi + 'orders')
    .subscribe((ordersFromDB) => {
      this.orders.next(ordersFromDB)
      return ordersFromDB
    });
    return this.orders
  }

  placeOrder(userForm: IOrder): Observable<any> {
    let cart: IOrderRows[] = this.storage.loadStorage('inCart');
    cart.forEach((item) => {
      userForm.orderRows.push(item)
    });

    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(userForm);
    
    return this.http.post(environment.urlApi + 'orders', body, {'headers': headers});
  }

  removeOrder(idToRemove: number){
    return this.http.delete(environment.urlApi + 'orders/' + idToRemove);
  }
}
