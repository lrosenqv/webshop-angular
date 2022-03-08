import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { userLS } from 'src/app/models/userToLS';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private existingUsers: IUser[] = [];
personToLS: userLS = {username: '', isAdmin: false};

private isOnline = new Subject<userLS[]>();
isOnline$ = this.isOnline.asObservable();

private online = new Subject<boolean>();
online$ = this.online.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(){
    this.http
    .get<IUser[]>('../../assets/login-credentials.json')
    .subscribe((dataFromApi) => {
      this.existingUsers = dataFromApi;
    });
  }

  checkUser(user: IUser){
    let personExist = this.existingUsers.find(exist => exist.username == user.username)
    let passwordExist = this.existingUsers.find(exist => exist.password == user.password)

    if(personExist && passwordExist){
      this.personToLS = {username: personExist.username, isAdmin: personExist.isAdmin}

      if(personExist.isAdmin === true){
        localStorage.setItem('onlineUser', JSON.stringify(this.personToLS))
      }
      localStorage.setItem('onlineUser', JSON.stringify(this.personToLS))
      this.online.next(true)
    } else {
      this.online.next(false)
    }
  }

  checkOnline(){
    let userInLS: userLS[] = JSON.parse(localStorage.getItem('onlineUser') || '[]')
    if(userInLS){
      this.isOnline.next(userInLS)
    }
  }
}
