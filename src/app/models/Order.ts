import { IOrderRows } from "./IOrderRows";

export class Order {
  companyId: number;
  created: string
  createdBy: string;
  paymentMethod: string;
  totalPrice: number;
  orderRows: IOrderRows[];

  constructor(companyId: number, created: string, createdBy: string, paymentMethod: string, totalPrice: number, orderRows: IOrderRows[]) {
    this.companyId = companyId;
    this.created = created;
    this.createdBy = createdBy;
    this.paymentMethod = paymentMethod;
    this.totalPrice = totalPrice;
    this.orderRows = orderRows
  }
}