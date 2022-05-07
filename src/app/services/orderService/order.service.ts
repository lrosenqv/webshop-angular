import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorageService/local-storage.service';
import { Observable, Subject } from 'rxjs';
import { IDBOrder } from 'src/app/models/IDBOrder';
import { Order } from 'src/app/models/Order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private urlApi: string = 'https://medieinstitutet-wie-products.azurewebsites.net/api/';
  private orders = new Subject<IDBOrder[]>();
  orders$ = this.orders.asObservable();

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  getOrdersDB(){
    this.http
    .get<IDBOrder[]>(this.urlApi + 'orders?CompanyId=38')
    .subscribe((ordersFromDB) => {
      this.orders.next(ordersFromDB)
    });
  }

  placeOrder(orderToAdd: Order): Observable<any>{
    const headers = {'Content-type':'application/json'}
    const orderString = JSON.stringify(orderToAdd)
    return this.http.post<string>(this.urlApi + 'orders', orderString, {'headers': headers});
  }

  removeOrder(idToRemove: number){
    return this.http.delete(this.urlApi + 'orders/' + idToRemove);
  }
}
