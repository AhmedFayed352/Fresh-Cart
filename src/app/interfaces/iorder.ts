import { ICartProducts } from "./icart-products";
import { IProduct } from "./iproduct";

export interface IOrder {
    id: number;
    paymentMethodType: string;
    totalOrderPrice: number;
    cartItems: ICartProducts;
}
