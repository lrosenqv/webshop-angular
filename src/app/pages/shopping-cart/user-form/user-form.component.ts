import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserOrder } from '../models/UserOrder';
import { OrderCheckoutService } from '../services/order-checkout.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  newDate: Date = new Date()

  userForm = this.fb.group({
    companyId: [0],
    created: this.newDate.toISOString().slice(0,-5),
    createdBy: [''],
    payment: [''],
    email:['']
  });

  constructor(private fb: FormBuilder, private service: OrderCheckoutService) { }

  ngOnInit(): void {
    
  }

  handleChange(form: any){
    let newUserOrder: UserOrder = {
      companyId: form.value.companyId,
      created: form.value.created,
      createdBy: form.value.createdBy,
      payment: form.value.payment,
      email: form.value.email
    }

    console.log(newUserOrder);
    
    this.service.orderBuild(newUserOrder)
  }
}
