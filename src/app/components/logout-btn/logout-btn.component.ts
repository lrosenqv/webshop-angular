import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-logout-btn',
  templateUrl: './logout-btn.component.html',
  styleUrls: ['./logout-btn.component.scss']
})
export class LogoutBtnComponent implements OnInit {

  constructor(private comp: LoginComponent) { }

  ngOnInit(): void {
  }

  logoutUser(){
    localStorage.removeItem('onlineUser')
    this.comp.onlineUser = false;
  }
}
