import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { ICategory } from 'src/app/models/ICategory';
import { ProductService } from 'src/app/services/productService/product.service';

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
    if(el.checked){
      this.renderThese.push(filterInput);
    }

    if(!el.checked){
      this.renderThese.findIndex((item, index) => {
        if(item === filterInput){
          this.renderThese.splice(index,1);
          if(this.renderThese == null || []){
            this.service.getProducts();
          }
        }
      });
    }
    this.service.filterProducts(this.renderThese)
  }
  resetFilters(){
    this.renderThese = [];
    this.service.getProducts();
  }
}
