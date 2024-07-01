import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit , OnDestroy{

  allWishList: IProduct[] = [];
  arr: Subscription[] = [];

  constructor(private _WishlistService: WishlistService){}

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

  removeWithlistItem(id :string) {
    this.arr.push(this._WishlistService.removeWithlistItem(id).subscribe({
      next: (response) => {
        this.displayWishlistItems();
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  ngOnDestroy(): void {
    for(let i =0; i<this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }

}
