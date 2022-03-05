import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    adress: [''],
    postalCode: [0],
    city:[''],
    email:['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
