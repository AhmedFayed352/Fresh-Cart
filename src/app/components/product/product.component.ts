import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() product!: IProduct;
  arr: Subscription[] = [];
  wishListProductsIdsList: string[] = [];

  constructor(private _CartService: CartService, 
              private _WishlistService: WishlistService, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.arr.push(this._WishlistService.WishListProductsId.subscribe((idsList) => { this.wishListProductsIdsList = idsList }));
  }

  addItemToCart(id: string) {
    this.arr.push(this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartItemsNum.next(response.numOfCartItems);
        this.toastr.success('Added To Cart', 'Successfully');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Something Went Wrong", 'Error');
      }
    }));
  }

  addToWishList(id: string) {
    if (!this.wishListProductsIdsList.includes(id)) {
      this.arr.push(this._WishlistService.addToWishList(id).subscribe({
        next: (response) => {
          this._WishlistService.wishItemsNum.next(response.data.length);
          this.toastr.success('Added To WishList', 'Successfully');
          this._WishlistService.WishListProductsId.next(response.data);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Something Went Wrong", 'Error');
        }
      }));
    } else {
      this.arr.push(this._WishlistService.removeWithlistItem(id).subscribe({
        next: (response) => {
          this._WishlistService.wishItemsNum.next(response.data.length);
          this.toastr.success('Removed From WishList', 'Successfully');
          this._WishlistService.WishListProductsId.next(response.data);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Something Went Wrong", 'Error');
        }
      }))
    }
  }

  isWishListProduct(id: string) {
    return this.wishListProductsIdsList.includes(id);
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }
}
