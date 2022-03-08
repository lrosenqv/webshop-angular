export interface IOrder{
    id: number;
    companyId: number;
    created: Date;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: [
        {
        id: number,
        productId: number,
        product: string,
        amount: number,
        orderId: number
        }
    ]
}