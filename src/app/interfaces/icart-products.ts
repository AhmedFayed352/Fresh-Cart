import { IProduct } from "./iproduct";

export interface ICartProducts {
    _id: string;
    count: number;
    price: number;
    product: IProduct;
}
