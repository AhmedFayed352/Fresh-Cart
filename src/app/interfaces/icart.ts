import { ICartProducts } from "./icart-products";

export interface ICart {
    products:ICartProducts[];
    totalCartPrice: number;
    _id: string;
}
