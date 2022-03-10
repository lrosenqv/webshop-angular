import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICategory } from 'src/app/models/ICategory'; 
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productfilter',
  templateUrl: './productfilter.component.html',
  styleUrls: ['./productfilter.component.scss']
})
export class ProductfilterComponent implements OnInit {
  categories: ICategory[] = [];
  outputValue: number = 0;

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.service.categories$.subscribe((dataFromApi) =>{
      this.categories = dataFromApi
    })

    this.service.getCategory();
  }

  valueChange(val: number){
    this.outputValue = val;
  }
}
