export interface IDBOrder{
    id: number;
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: [{
        id: number;
        productId: number;
        product: string;
        amount: number
        orderId: number;
    }]
}