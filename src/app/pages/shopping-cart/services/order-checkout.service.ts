import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrder } from '../models/IOrder';
import { UserOrder } from '../models/UserOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderCheckoutService {
  private order = new Subject<IOrder[]>();
  order$ = this.order.asObservable();

  constructor(private http: HttpClient) { }

  getOrderDetails(){
    this.http.get<IOrder[]>(environment.orderCheckoutUrl)
    .subscribe((dataFromAPI) => {
      this.order.next(dataFromAPI)
    });
  }

  orderBuild(userDetails: UserOrder){
    console.log(userDetails);
  }
}
