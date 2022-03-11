import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/productService/product.service';
import { OrderService } from 'src/app/services/orderService/order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  totalPrice: number = 0;

  constructor(private orderService: OrderService, private service: ProductService ) { }

  ngOnInit(): void {
    this.service.totalPrice$.subscribe((sumFromService: number) => {
      this.totalPrice = sumFromService;
    });

    this.orderService.getOrdersDB();
  }

}
