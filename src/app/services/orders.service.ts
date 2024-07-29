import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient: HttpClient) { }

  onlinePayment(cartId: any, shippingAddress: any): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200/`,
      { shippingAddress: shippingAddress });
  }

  cashPayment(cartId: any, shippingAddress:any) : Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      { shippingAddress: shippingAddress }
    )
  }

  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  }
}

// https://fresh-cart-beryl-chi.vercel.app/    6407cf6f515bdcf347c09f17