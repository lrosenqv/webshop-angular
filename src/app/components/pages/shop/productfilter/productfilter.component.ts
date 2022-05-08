import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/models/ICategory';
import { ProductService } from 'src/app/services/productService/product.service';

@Component({
  selector: 'app-productfilter',
  templateUrl: './productfilter.component.html',
  styleUrls: ['./productfilter.component.scss']
})
export class ProductfilterComponent implements OnInit {
  categories: ICategory[] = [];
  filter: number[] = [];
  searchString: string = "";

  searchForm = this.fb.group({
    searchText: "",
  })

  constructor(private service: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.service.categories$.subscribe((dataFromApi) =>{
      this.categories = dataFromApi;
    })
    this.service.getCategory();
  }

  categoryCheck(e: HTMLInputElement, id: number){
    if(e.checked){
      this.filter.push(id)
    }

    if(!e.checked){
      this.filter.findIndex((item, index) => {
        if(item === id){
          this.filter.splice(index,1);

          if(this.filter?.length === 0){
            console.log(this.searchString);

            if(this.searchString?.length >= 2){
              this.searchProductsInput(this.searchString)
            } else {
              this.resetFilters();
            }
          }
        }
      });
    }
    this.service.filterProducts(this.filter)
  }

  resetFilters(){
    this.filter = [];
    this.service.getProducts();
  }

  searchProductsInput(searchText: string){
    this.searchString = searchText;
    this.service.searchProduct(searchText)

    /*if(searchText?.length >= 2){
      this.service.searchProduct(searchText)
    } else {
      this.service.filterProducts(this.filter);
      this.searchString = "";
    }

    if(searchText?.length === 0){
      if(this.filter?.length === 0){
        this.resetFilters()
      } else {
      this.service.filterProducts(this.filter)
      }
    }*/
  }
}
