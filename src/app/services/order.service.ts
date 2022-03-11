import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderRows } from 'src/app/models/IOrderRows';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { IDBOrder } from '../models/IDBOrder';
import { Order } from '../models/Order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = new Subject<IDBOrder[]>();
  orders$ = this.orders.asObservable();

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  getOrdersDB(){
    this.http
    .get<IDBOrder[]>(environment.urlApi + 'orders?CompanyId=38')
    .subscribe((ordersFromDB) => {
      this.orders.next(ordersFromDB)
    });
  }

  placeOrder(orderToAdd: Order): Observable<any>{
    const headers = {'Content-type':'application/json'}
    const orderString = JSON.stringify(orderToAdd)
    return this.http.post<string>(environment.urlApi + 'orders', orderString, {'headers': headers});
  }

  removeOrder(idToRemove: number){
    return this.http.delete(environment.urlApi + 'orders/' + idToRemove);
  }
}
