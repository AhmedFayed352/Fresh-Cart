import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , OnDestroy{

  isLoggedUser:boolean = false;
  numOfCartItems:number = 0;
  numOfWishlistItems:number = 0;
  arr: Subscription[] = [];

  constructor(private _AuthService: AuthService , private _Router: Router , private _CartService:CartService , private _WishlistService: WishlistService){}

  logOut() {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
    this._AuthService.isLoggedInSubject.next(false);
  }
  ngOnInit() {
    this.arr.push(this._AuthService.isLoggedInSubject.subscribe(
      (islogged) => {this.isLoggedUser = islogged}
    ));

    this.arr.push(this._CartService.cartItemsNum.subscribe({
      next: (nums) => {
        this.numOfCartItems = nums;
      }
    }));

    this.arr.push(this._WishlistService.wishItemsNum.subscribe({
      next: (nums) => {
        this.numOfWishlistItems = nums;
      }
    }));
  }

  ngOnDestroy(): void {
    for(let i =0; i<this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }
}
