import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IOrderRows } from 'src/app/models/IOrderRows';
import { IProduct } from 'src/app/models/IProduct';
import { ICategory } from 'src/app/models/ICategory';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private urlApi: string = 'https://medieinstitutet-wie-products.azurewebsites.net/api/';
  private searchApi: string = 'https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=';

  private allProducts: IProduct[] = [];
  private products = new Subject<IProduct[]>();
  products$ = this.products.asObservable();

  private productsToRender = new Subject<IProduct[]>();
  productsToRender$ = this.productsToRender.asObservable();

  private inStorage = new Subject<IProduct[]>()
  inStorage$ = this.inStorage.asObservable();

  private totalPrice = new Subject<number>();
  totalPrice$ = this.totalPrice.asObservable();

  private categories = new Subject<ICategory[]>();
  categories$ = this.categories.asObservable();

  private searched: IProduct[] = [];
  private filtered: IProduct[] = [];
  private matchedProd: IProduct[] = [];

  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  getProducts(){
    this.http
    .get<IProduct[]>(this.urlApi + 'products')
    .subscribe((dataFromApi) => {
      this.products.next(dataFromApi)
      this.allProducts = dataFromApi;
      this.checkMatches(dataFromApi)
      this.productsToRender.next(dataFromApi)
    });
  }

  getCategory(){
    this.http
    .get<ICategory[]>(this.urlApi + 'categories')
    .subscribe((dataFromApi) => {
      this.categories.next(dataFromApi)
    });
  }

  checkMatches(fromApi: IProduct[]){
    let fromLS: IOrderRows[] = this.storage.loadStorage('inCart')
    let matches = fromApi.filter((product) => {
      return fromLS.some((prod) => {
        return prod.productId === product.id
      });
    });
    this.inStorage.next(matches)
    this.totalPrice.next(this.countTotal(matches))
  }

  countTotal(products: IProduct[]){
    return products.reduce(( previousValue, currentValue ) => previousValue + currentValue.price, 0)
  }


  filterSearchMatch(){
    let filteredArray: IProduct[];

    if(this.filtered.length === 0){
      filteredArray = this.allProducts;
    } else {
      filteredArray = this.filtered;
    }

    let result = filteredArray.filter((filter) => {
      return this.searched.some((search) => {
        return filter.id === search.id
      })
    })
    this.productsToRender.next(result)
  }

  searchProduct(searchText: string){
    console.log(this.searched);

    if(searchText.length >= 2) {
      this.http.get<IProduct[]>(this.searchApi + searchText)
      .subscribe((dataFromApi) => {
        this.searched = dataFromApi;

        if(this.filtered.length === 0){
          this.productsToRender.next(dataFromApi)
        } else {
          this.filterSearchMatch()
        }
      })
    } else {
      this.searched = [];
      if(this.filtered.length === 0){
        this.productsToRender.next(this.allProducts)
      } else {
        this.productsToRender.next(this.filtered)
      }
    }
  }

  filterProducts(categories: number[]){
    let filterRender: IProduct[] = [];

    if(categories.length === 0){
      this.filtered = this.allProducts;
    } else {
      this.allProducts.filter((match) => {
        return !categories.some((c) => {
          match.productCategory.forEach(m => {
            if(m.categoryId === c){
              filterRender.push(match)
            }
          })
        })
      })
    }
    this.filtered = [...new Set(filterRender.map(t => t))]

    if(this.searched.length === 0){
      this.productsToRender.next(this.filtered)
    } else {
      this.filterSearchMatch()
    }
  }
}
