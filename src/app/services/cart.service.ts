import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../interfaces/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  headers:any = {token: localStorage.getItem("token")}

  constructor(private _HttpClient: HttpClient) { }

  addToCart(id:string) : Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/cart",
      {productId: id},
      {headers: this.headers}
    );
  }

  getUserCart() : Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/cart", {headers: this.headers});
  }

  removeCartItem(id: string) : Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {headers: this.headers}
    );
  }

  updateCartItem(id : string , count: number) : Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
      {count: count},
      {headers: this.headers}
    );
  }

  clearCartItems() :Observable<any> {
    return this._HttpClient.delete("https://ecommerce.routemisr.com/api/v1/cart",
      {headers: this.headers}
    );
  }
}
