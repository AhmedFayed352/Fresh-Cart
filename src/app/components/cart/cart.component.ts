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

  arr: Subscription[] = [];

  constructor(private _CartService: CartService){}

  ngOnInit(): void {
    this.arr.push(this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartItems = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  removeCartItem(id: string) {
    this.arr.push(this._CartService.removeCartItem(id).subscribe({
      next: (response) => {
        this.cartItems = response.data;
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
    this.arr.push(this._CartService.clearCartItems().subscribe({
      next: (response) => {
        response
        this.cartItems = undefined;
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
