import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishItemsNum = new BehaviorSubject<number>(0);

  constructor(private _HttpClient:HttpClient) { 
    this.getUserWishList().subscribe({
      next: (response) => {
        this.wishItemsNum.next(response.count);
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
