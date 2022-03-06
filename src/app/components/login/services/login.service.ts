import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private existingUsers: IUser[] = [];

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
      console.log("yay");

      if(personExist.isAdmin === true){
        return console.log("is also admin");
      }
      return console.log("not admin");
    }
    else if(!personExist || !passwordExist) {
      console.log("nay");
    }
  }
}
