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

  /*private cart = new Subject<IOrder[]>();
  cart$ = this.cart.asObservable();*/

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  getOrderDetails(){
    this.http.get<IOrder[]>(environment.orderCheckoutUrl)
    .subscribe((dataFromAPI) => {
      this.order.next(dataFromAPI)
    });
  }

  orderBuild(userDetails: IOrder){
    let cart: IOrderRows[] = this.storage.loadStorage('inCart');
    let newOrder = userDetails;
    cart.forEach((product) => {
      newOrder.orderRows.push(product)
    });

    console.log(newOrder);
  }
}
