import { IOrderRows } from "src/app/models/IOrderRows";

export interface IOrder{
    id: number;
    companyId: number;
    created: Date;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    email: string;
    orderRows: IOrderRows[];
}