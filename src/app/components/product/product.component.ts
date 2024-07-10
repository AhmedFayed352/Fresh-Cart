import { Component, Input, OnDestroy } from '@angular/core';
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
export class ProductComponent implements OnDestroy{
  @Input() product!: IProduct;
  arr:Subscription[] = [];
  // proId:boolean = false;

  constructor(private _CartService:CartService, private _WishlistService:WishlistService , private toastr:ToastrService){}

  addItemToCart(id:string) {
    this.arr.push(this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartItemsNum.next(response.numOfCartItems);
        this.toastr.success('Added To Cart' , 'Successfully');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Something Went Wrong" ,'Error');
      }
    }));
  }

  addToWishList(id: string) {
    this.arr.push(this._WishlistService.addToWishList(id).subscribe({
      next: (response) => {
        this._WishlistService.wishItemsNum.next(response.data.length);
        this.toastr.success('Added To WishList' ,'Successfully');
        // if(response.data.includes(id)) {
        //   this.proId = true;
        // }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Something Went Wrong" ,'Error');
      }
    }));
  }

  ngOnDestroy(): void {
    for(let i =0; i<this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }
}
