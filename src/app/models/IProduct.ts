export interface IProduct{
    id: number;
    name: string;
    description: string;
    year: number;
    price: number;
    imageUrl: string;
    productCategory: [
        {categoryId: number, category: any},
        {categoryId: number, category: any},
    ]
}