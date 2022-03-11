import { Component, OnInit } from '@angular/core';
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

  renderThese: number[] = [];

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.service.categories$.subscribe((dataFromApi) =>{
      this.categories = dataFromApi
    })

    this.service.getCategory();
  }

  categoryCheck(el: HTMLInputElement, filterInput: number){
    let allFilterInputs = document.querySelectorAll('input')
      .forEach((input) => {
        if(!input.checked){
          this.service.getProducts();
        }
      });

    if(el.checked){
      this.renderThese.push(filterInput);
    }

    if(!el.checked){
      this.renderThese.findIndex((item, index) => {
        if(item === filterInput){
          this.renderThese.splice(index,1);
        }
      });
    }
    this.service.filterProducts(this.renderThese)
  }
}
