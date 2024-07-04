import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit , OnDestroy{

  allWishList: IProduct[] = [];
  arr: Subscription[] = [];

  constructor(private _WishlistService: WishlistService , private _CartService: CartService){}

  ngOnInit(): void {
    this.displayWishlistItems();
  }
  
  displayWishlistItems() {
    this.arr.push(this._WishlistService.getUserWishList().subscribe({
      next: (response) => {
        this.allWishList = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  removeWishlistItem(id :string) {
    this.arr.push(this._WishlistService.removeWithlistItem(id).subscribe({
      next: (response) => {
        this._WishlistService.wishItemsNum.next(response.data.length);
        this.displayWishlistItems();
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  addItemToCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {this._CartService.cartItemsNum.next(response.numOfCartItems);},
      error: (err) => {console.log(err)}
    })
  }

  ngOnDestroy(): void {
    for(let i =0; i<this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }

}
