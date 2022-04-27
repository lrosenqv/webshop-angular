import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/models/ICategory';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/productService/product.service';

@Component({
  selector: 'app-productfilter',
  templateUrl: './productfilter.component.html',
  styleUrls: ['./productfilter.component.scss']
})
export class ProductfilterComponent implements OnInit {
  categories: ICategory[] = [];
  filter: number[] = [];
  search: string = "";
  searchForm: FormGroup;

  /*searchForm = this.fb.group({
    searchText: "",
    catgoryList: [
      { id: 5, name: "Action" },
      { id: 6, name: "Thriller" },
      { id: 7, name: "Comedy" },
      { id: 8, name: "Sci-Fi" },
    ]
  })*/

  constructor(private service: ProductService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchText: "",
    })
   }

  ngOnInit(): void {
    this.service.categories$.subscribe((dataFromApi) =>{
      this.categories = dataFromApi
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

          if(this.filter == null || []){
            this.service.getProducts()
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
    if(searchText.length > 1){
      this.search = searchText;
      this.service.searchProduct(searchText)
    } else {
      this.service.getCategory()
    }
  }
}
