import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICart } from 'src/app/interfaces/icart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{

  cartItems?: ICart;
  isExist:boolean = false;
  arr: Subscription[] = [];

  constructor(private _CartService: CartService){}

  ngOnInit(): void {
    this.arr.push(this._CartService.getUserCart().subscribe({
      next: (response) => {
        if(response.numOfCartItems == 0) {
          this.isExist = true;
        }
        this.cartItems = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  removeCartItem(id: string) {
    this.isExist = false;
    this.arr.push(this._CartService.removeCartItem(id).subscribe({
      next: (response) => {
        this.cartItems = response.data;
        this._CartService.cartItemsNum.next(response.numOfCartItems);
        if(response.numOfCartItems == 0) {
        this.isExist = true;
        }
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  updateCartItem(id:string , count: number) {
    if(count != 0) {
      this.arr.push(this._CartService.updateCartItem(id,count).subscribe({
        next: (response) => {
          this.cartItems = response.data;
        },
        error: (err) => {
          console.log(err)
        }
      }));
    } else {
      this.removeCartItem(id);
    }
  }

  clearCartItems() {
    this.isExist = false;
    this.arr.push(this._CartService.clearCartItems().subscribe({
      next: (response) => {
        this._CartService.cartItemsNum.next(response.numOfCartItems);
        this.isExist = true;
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
