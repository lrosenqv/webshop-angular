import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { IOrder } from '../shopping-cart/models/IOrder';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isAdmin: boolean = false;
  orders: IOrder[] = [];

  constructor(private storage: LocalStorageService) {}

  ngOnInit(): void {
    this.orders = this.storage.loadStorage('orders');
  }
}
