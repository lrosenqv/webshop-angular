import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getUsers(){
    this.http
    .get<IUser>('../../assets/login-credentials.json')
    .subscribe((usersFromFile) => {
      console.log(usersFromFile);
    });
  }
}
