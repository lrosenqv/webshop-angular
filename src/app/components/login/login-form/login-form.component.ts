import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterEvent } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']

})
export class LoginFormComponent implements OnInit {
  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder, private service: LoginService, public route: Router) { }

  ngOnInit(): void {
    this.service.getUsers()
    //this.route.activateEvents routeroutlet
    //this.route.events.subscribe router
  }

  userValidation(){
   let check = this.service.checkUser(this.loginForm.value)
   if(check){
     this.route.navigateByUrl('admin')
   }
  }
}
