import { Observable, Subject } from "rxjs";
import { IDBOrder } from "../models/IDBOrder";
import { IOrderService } from "../models/IOrderService";
import { IOrder2 } from "../models/IUser 2";
import { Order } from "../models/Order";


/*export class MockOrderService implements IOrderService {
    private orders = new Subject<IOrder2[]>();
    public orders$: Observable<IOrder2[]> = this.orders.asObservable();

    /*testData: Order[] = [
        new Order('Malin', 213, 'Klarna', 299), 
        new Order('Pelle', 342, 'PayPal', 399), 
        new Order('Felix', 432, 'MasterCard', 199 )
    ]

    getOrders(): void {
        this.orders.next(this.testData)
    }
}*/