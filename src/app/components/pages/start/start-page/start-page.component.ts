import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/productService/product.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  products: IProduct[] = [];

  imgGrid1: IProduct[] = [];
  imgGrid2: IProduct[] = [];
  imgGrid3: IProduct[] = [];


  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.service.products$.subscribe((dataFromService) => {
      this.products = dataFromService;
      this.imgGrid1 = this.products.slice(0,7)
      this.imgGrid2 = this.products.slice(8,15)
      this.imgGrid3 = this.products.slice(16, 23)
    });
    this.service.getProducts();
  }


}
