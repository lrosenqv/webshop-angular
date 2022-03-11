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
   let storage: any[] = JSON.parse(localStorage.getItem(LSList) || '[]')
   return storage
  }

  getStorage(LSList: string) {
    let jsonData: IOrderRows[] = JSON.parse(localStorage.getItem(LSList) || '[]' )
    this.cache.next(jsonData)
    return jsonData
  }

  addToStorage(toAdd: any, LSList: string){
    let myStorage = this.loadStorage(LSList)

    myStorage.push(toAdd)
    this.setStorage(myStorage, LSList)
  }

  setStorage(toSet: any[], LSList: string) {
    localStorage.setItem(LSList, JSON.stringify(toSet))
  }

  removeStorage(LSList: string){
    localStorage.removeItem(LSList)
  }
}
