import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { IOrder } from '../models/IOrder';
import { OrderCheckoutService } from '../services/order-checkout.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  newDate: Date = new Date();
  totalPrice: number = 0

  userForm = this.fb.group({
    companyId: ['', [Validators.required]],
    created: this.newDate.toISOString().slice(0,-5),
    firstname: ['', [Validators.required]],
    lastname: [''],
    payment: ['', [Validators.required]],
    email:['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder, private service: OrderCheckoutService, private prodService: ProductService) { }

  ngOnInit(): void {
    this.prodService.totalPrice$.subscribe((valueFromService)=>{
      this.totalPrice = valueFromService;
    });
  }

  get companyId(){
    return this.userForm.get('companyId')
  }

  get firstname(){
    return this.userForm.get('firstname')
  }

  get payment(){
    return this.userForm.get('payment')
  }

  get email(){
    return this.userForm.get('email')
  }

  handleChange(form: FormGroup){
    let newOrder: IOrder = {
      id: 0,
      companyId: form.value.companyId,
      created: form.value.created,
      createdBy: form.value.firstname + ' ' + form.value.lastname,
      paymentMethod: form.value.payment,
      totalPrice: this.totalPrice,
      status: 0,
      email: form.value.email,
      orderRows: []
    }
    this.service.orderBuild(newOrder)
  }
}
/*  id: number;
    companyId: number;
    created: Date;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: IOrderRows[];*/