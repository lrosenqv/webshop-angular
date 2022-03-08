import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private cache = new Subject<number[]>();
  cache$ = this.cache.asObservable();

  storageList: number[] = [];
  constructor() { }

  loadStorage(LSList: string){
   this.storageList = JSON.parse(localStorage.getItem(LSList) || '[]')
   return this.storageList
  }

  getStorage(LSList: string) {
    let jsonData: number[] = JSON.parse(localStorage.getItem(LSList) || '[]' )
    this.cache.next(jsonData)
    return jsonData
  }

  addToStorage(toAdd: number, LSList: string){
    let myStorage = this.loadStorage(LSList)

    myStorage.push(toAdd)
    this.setStorage(myStorage)
  }

  setStorage(toSet: number[]) {
    localStorage.setItem('inCart', JSON.stringify(toSet))
  }

  deleteFromStorage(toDelete: number, LSList: string){
    let myStorage = this.loadStorage(LSList)
    myStorage.find((item) => {
      if(item == toDelete){
        console.log(toDelete);
      }
    });
  }
}
