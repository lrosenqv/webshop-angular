import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProdInOrder } from '../models/IProdInOrder';


@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private cache = new Subject<IProdInOrder[]>();
  cache$ = this.cache.asObservable();

  storageList: IProdInOrder[] = [];
  constructor() { }

  loadStorage(LSList: string){
   this.storageList = JSON.parse(localStorage.getItem(LSList) || '[]')
   return this.storageList
  }

  getStorage(LSList: string) {
    let jsonData: IProdInOrder[] = JSON.parse(localStorage.getItem(LSList) || '[]' )
    this.cache.next(jsonData)
    return jsonData
  }

  addToStorage(toAdd: IProdInOrder, LSList: string){
    let myStorage = this.loadStorage(LSList)

    myStorage.push(toAdd)
    this.setStorage(myStorage)
  }

  setStorage(toSet: IProdInOrder[]) {
    localStorage.setItem('inCart', JSON.stringify(toSet))
  }
}
