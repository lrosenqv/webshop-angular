import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InCart } from '../models/InCart';


@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private cache = new Subject<number[]>();
  cache$ = this.cache.asObservable();

  storageList: number[] = [];

  constructor() { }

  loadStorage(){
   this.storageList = JSON.parse(localStorage.getItem('inCart') || '[]')
   return this.storageList
  }

  getStorage() {
    let jsonData: number[] = JSON.parse(localStorage.getItem('inCart') || '[]' )
    this.cache.next(jsonData)
    return jsonData
  }

  addToStorage(toAdd: number){
    let myStorage = this.loadStorage()

    myStorage.push(toAdd)
    this.setStorage(myStorage)
  }

  setStorage(toSet: number[]) {
    localStorage.setItem('inCart', JSON.stringify(toSet))
  }

  deleteFromStorage(toDelete: number){
    let myStorage = this.loadStorage()
    myStorage.find((item) => {
      if(item == toDelete){

      }
    })
  }
}
