import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { OrderCheckoutService } from './services/order-checkout.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  totalPrice: number = 0;

  constructor(private orderService: OrderCheckoutService, private service: ProductService ) { }

  ngOnInit(): void {
    this.service.totalPrice$.subscribe((sumFromService) => {
      this.totalPrice = sumFromService;
    });

    this.orderService.getOrdersDB();
  }

}
