import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IOrderRows } from 'src/app/models/IOrderRows';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { IOrder } from '../models/IOrder';


@Injectable({
  providedIn: 'root'
})
export class OrderCheckoutService {
  private order = new Subject<IOrder[]>();
  order$ = this.order.asObservable();

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  getOrderDetails(){
    this.http.get<IOrder[]>(environment.orderCheckoutUrl)
    .subscribe((dataFromAPI) => {
      this.order.next(dataFromAPI)
    });
  }

  orderBuild(userDetails: IOrder){
    let orderList: IOrder[] = this.storage.loadStorage('orders')
    let cart: IOrderRows[] = this.storage.loadStorage('inCart');
    cart.forEach((product) => {
      userDetails.orderRows.push(product)
    });

    orderList.push(userDetails)
    localStorage.setItem('orders', JSON.stringify(orderList))
    localStorage.removeItem('inCart')
  }
}
