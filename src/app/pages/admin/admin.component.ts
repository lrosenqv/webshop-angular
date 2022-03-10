import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { IOrder } from 'src/app/models/IOrder'; 
import { faBriefcase, faBars, faChartArea, faAddressCard, faEnvelope, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { OrderCheckoutService } from '../shopping-cart/services/order-checkout.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  faEnvelope = faEnvelope;
  faAdd = faAddressCard;
  faCreditCard = faCreditCard;
  faBriefcase = faBriefcase;
  faBars = faBars;
  faChartLine = faChartArea;

  isAdmin: boolean = false;
  orders: IOrder[] = [];

  constructor(private storage: LocalStorageService, private service: OrderCheckoutService) {}

  ngOnInit(): void {
    this.refreshOrderList();
  }

  refreshOrderList(){
    this.service.orders$
    .subscribe((data) => {
      this.orders = data;
    });
  }
}
