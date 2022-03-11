import { Observable } from "rxjs";
import { IOrder2 } from "./IUser 2";

export interface IOrderService {
    orders$: Observable<IOrder2[]>

    getOrders(): void;
}