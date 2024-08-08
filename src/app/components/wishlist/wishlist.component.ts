import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  isExist:boolean = false;
  arr: Subscription[] = [];

  constructor(private _WishlistService: WishlistService, 
              private _CartService: CartService, 
              private toastr:ToastrService){}

  ngOnInit(): void {
    this.displayWishlistItems();
  }
  
  displayWishlistItems() {
    this.arr.push(this._WishlistService.getUserWishList().subscribe({
      next: (response) => {
        if(response.count == 0) {
          this.isExist = true;
        }
        this.allWishList = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  removeWishlistItem(id :string) {
    this.isExist = false;
    this.arr.push(this._WishlistService.removeWithlistItem(id).subscribe({
      next: (response) => {
        if(response.count == 0) {
          this.isExist = true;
        }
        this._WishlistService.wishItemsNum.next(response.data.length);
        this._WishlistService.WishListProductsId.next(response.data);
        this.displayWishlistItems();
        this.toastr.success("Removed From Wishlist" , "Successfully");
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  addItemToCart(id: string) {
    this.arr.push(this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartItemsNum.next(response.numOfCartItems);
        this.toastr.success("Added to Cart" , "Successfully");
        this.removeWishlistItem(id);
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
