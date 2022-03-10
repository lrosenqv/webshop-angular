import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { IOrder } from '../shopping-cart/models/IOrder';
import { faBriefcase, faBars, faChartArea, faAddressCard, faEnvelope, faCreditCard } from '@fortawesome/free-solid-svg-icons'

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

  constructor(private storage: LocalStorageService) {}

  ngOnInit(): void {
    this.orders = this.storage.loadStorage('orders');
    console.log(this.orders);
    
  }
}
