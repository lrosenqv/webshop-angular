import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/productService/product.service';
import { OrderService } from 'src/app/services/order.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { IDBOrder } from 'src/app/models/IDBOrder';
import { Order } from 'src/app/models/Order';
import { IOrderRows } from 'src/app/models/IOrderRows';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  totalPrice: number = 0;
  dataFromDB: IDBOrder[] =[];
  order: Order = new Order(0, '', '', '', 0, [])

  orderAccepted: boolean = false;

  userForm = this.fb.group({
    companyId: ['', [Validators.required]],
    created: new Date().toISOString().slice(0,-5),
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: [''],
    paymentMethod: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private service: OrderService, private prodService: ProductService, private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.prodService.totalPrice$.subscribe((valueFromService)=>{
      this.totalPrice = valueFromService;
    });
    this.service.getOrdersDB();
  }

  get companyId(){
    return this.userForm.get('companyId')
  }

  get firstname(){
    return this.userForm.get('name')
  }

  get paymentMethod(){
    return this.userForm.get('paymentMethod')
  }

  createOrder(){
    let cart: IOrderRows[] = this.storage.loadStorage('inCart');
    let creator = this.userForm.value.firstname + " " + this.userForm.value.lastname;

    this.order = new Order(
      this.userForm.value.companyId,
      this.userForm.value.created,
      creator,
      this.userForm.value.paymentMethod,
      this.totalPrice,
      cart
    )
    return this.order
  }

  handleForm(){
    let newOrder = this.createOrder();
    this.service.placeOrder(newOrder)
      .subscribe((resp) => {
        console.log("Ordered!", resp);
        this.service.getOrdersDB();
    });
    this.orderAccepted = true;
    this.userForm.reset();
    this.storage.removeStorage('inCart')
  }
}
