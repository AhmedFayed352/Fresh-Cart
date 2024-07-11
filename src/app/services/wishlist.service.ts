import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishItemsNum = new BehaviorSubject<number>(0);
  WishListProductsId = new BehaviorSubject<string[]>([])

  constructor(private _HttpClient:HttpClient) { 
    this.getUserWishList().subscribe({
      next: (response) => {
        this.wishItemsNum.next(response.count);
        this.WishListProductsId.next((response.data as IProduct[]).map((product) => product._id));
      },
      error: (err) => {
        if(err.status == 404) {
          this.wishItemsNum.next(0);
        }
      }
    })
  }

  addToWishList(id : string) : Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/wishlist",
      {productId: id},
    );
  }

  getUserWishList() : Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/wishlist");
  }

  removeWithlistItem(id:string) : Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`);
  }
}
