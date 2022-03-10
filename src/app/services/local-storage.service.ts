import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IOrderRows } from '../models/IOrderRows';


@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private cache = new Subject<IOrderRows[]>();
  cache$ = this.cache.asObservable();

  storageList: IOrderRows[] = [];
  constructor() { }

  loadStorage(LSList: string){
   this.storageList = JSON.parse(localStorage.getItem(LSList) || '[]')
   return this.storageList
  }

  getStorage(LSList: string) {
    let jsonData: IOrderRows[] = JSON.parse(localStorage.getItem(LSList) || '[]' )
    this.cache.next(jsonData)
    return jsonData
  }

  addToStorage(toAdd: IOrderRows, LSList: string){
    let myStorage = this.loadStorage(LSList)

    myStorage.push(toAdd)
    this.setStorage(myStorage)
  }

  setStorage(toSet: IOrderRows[]) {
    localStorage.setItem('inCart', JSON.stringify(toSet))
  }
}
