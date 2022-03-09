export interface UserOrder{
    companyId: number;
    created: Date;
    createdBy: string;
    payment: string;
    email: string;

   /* constructor(companyId: number, createdBy: string, payment: string, email: string ){
        this.companyId = companyId;
        this.created = new Date();
        this.createdBy = createdBy;
        this.payment = payment;
        this.email = email;
    }*/
}