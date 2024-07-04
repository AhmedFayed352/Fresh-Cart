import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnDestroy{
  @Input() product!: IProduct;
  arr:Subscription[] = [];

  constructor(private _CartService:CartService, private _WishlistService:WishlistService){}

  addItemToCart(id:string) {
    this.arr.push(this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartItemsNum.next(response.numOfCartItems);
      },
      error: (err) => {console.log(err)}
    }));
  }

  addToWishList(id: string) {
    this.arr.push(this._WishlistService.addToWishList(id).subscribe({
      next: (response) => {
        this._WishlistService.wishItemsNum.next(response.data.length);
      },
      error: (err) => {console.log(err)}
    }));
  }

  ngOnDestroy(): void {
    for(let i =0; i<this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }
}
