import { IOrderRows } from "src/app/models/IOrderRows";

export interface IOrder{
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    orderRows: IOrderRows[];
}