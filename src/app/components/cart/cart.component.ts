import { Component, OnInit } from '@angular/core';
import { ICart } from 'src/app/interfaces/icart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cartItems?: ICart;

  constructor(private _CartService: CartService){}

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartItems = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeCartItem(id: string) {
    this._CartService.removeCartItem(id).subscribe({
      next: (response) => {
        this.cartItems = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateCartItem(id:string , count: number) {
    if(count != 0) {
      this._CartService.updateCartItem(id,count).subscribe({
        next: (response) => {
          this.cartItems = response.data;
        },
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      this.removeCartItem(id);
    }
  }

  clearCartItems() {
    this._CartService.clearCartItems().subscribe({
      next: (response) => {
        console.log(response);
        this.cartItems = undefined;
      },
      error: (err) => {console.log(err)}
    })
  }
}
