import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { IOrder } from 'src/app/models/IOrder'; 
import { OrderCheckoutService } from '../services/order-checkout.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  newDate: Date = new Date();
  totalPrice: number = 0;
  newOrderId: number = 0;

  userForm = this.fb.group({
    companyId: ['', [Validators.required]],
    created: this.newDate.toISOString().slice(0,-5),
    firstname: ['', [Validators.required]],
    lastname: [''],
    payment: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private service: OrderCheckoutService, private prodService: ProductService) { }

  ngOnInit(): void {
    this.prodService.totalPrice$.subscribe((valueFromService)=>{
      this.totalPrice = valueFromService;
    });
    this.refresh();
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

  refresh(){
    this.service.getOrdersDB().subscribe((data) => {
    });
  }

  handleChange(form: FormGroup){
    let newOrder: IOrder = {
      companyId: form.value.companyId,
      created: form.value.created,
      createdBy: form.value.firstname + ' ' + form.value.lastname,
      paymentMethod: form.value.payment,
      totalPrice: this.totalPrice,
      orderRows: []
    }

    this.service.orderBuild(newOrder)
    .subscribe((data)=>{
      this.refresh();
    });
  }
}
