import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/components/login/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private service: LoginService) { }

  ngOnInit(): void {
  }

}
