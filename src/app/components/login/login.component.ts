import { Component, OnInit} from '@angular/core';
import { IUserLS } from 'src/app/models/IUserLS';
import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  onlineUser: boolean = false;
  userOnline: IUserLS[] = [];

  constructor(private service: LoginService) {
  }

  ngOnInit(): void {
    this.service.isOnline$.subscribe((dataFromLS) => {
      this.userOnline = dataFromLS;
    });

    this.service.online$.subscribe((isTrue) => {
      this.onlineUser = isTrue;
    })
    this.service.checkOnline();
    this.checkOn(this.userOnline)
  }

  checkOn(value: IUserLS[]){
    if(value.length < 1){
      this.onlineUser = false;
    } else {
      this.onlineUser = true;
    }
  }
}
