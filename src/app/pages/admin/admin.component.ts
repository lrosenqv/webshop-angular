import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/IOrder'; 
import { faBriefcase, faBars, faChartArea, faAddressCard, faEnvelope, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { OrderService } from 'src/app/services/order.service'; 
import { IDBOrder } from 'src/app/models/IDBOrder';

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
  orders: IDBOrder[] = [];

  constructor(private service: OrderService) {}

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.service.orders$.subscribe((ordersFromDb) => {
      this.orders = ordersFromDb;
    });
    this.service.getOrdersDB();
  }

  removeOrder(idToRemove: number){
    this.service.removeOrder(idToRemove).subscribe((data) => {
      console.log(data)
    });
    this.refreshList()
  }
}
