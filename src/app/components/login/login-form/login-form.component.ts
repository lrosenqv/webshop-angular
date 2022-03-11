import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

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


  constructor(private fb: FormBuilder, private service: LoginService) { }

  ngOnInit(): void {
    this.service.getUsers()
  }

  userValidation(){
    this.service.checkUser(this.loginForm.value)
  }
}
