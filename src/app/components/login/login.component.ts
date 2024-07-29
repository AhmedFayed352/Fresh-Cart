import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { WishlistService } from 'src/app/services/wishlist.service';
import { IProduct } from 'src/app/interfaces/iproduct';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  errorMessage: string = '';
  isLoading: boolean = false;
  arr: Subscription[] = [];

  constructor(private _AuthService: AuthService, private _Router: Router, private _CartService: CartService, private _WishlistService: WishlistService) {

  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}/)])
  });

  handleLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.arr.push(this._AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this._CartService.getUserCart().subscribe({
            next: (response) => {
              this._CartService.cartItemsNum.next(response.numOfCartItems);
            },
            error: (err) => {
              if (err.status == 404) {
                this._CartService.cartItemsNum.next(0);
              }
            }
          })
          this._WishlistService.getUserWishList().subscribe({
            next: (response) => {
              this._WishlistService.wishItemsNum.next(response.count);
              this._WishlistService.WishListProductsId.next((response.data as IProduct[]).map((product) => product._id));
            },
            error: (err) => {
              this._WishlistService.wishItemsNum.next(0);
            }
          });
          this._Router.navigate(["/home"]);
          this.isLoading = false;
          this._AuthService.isLoggedInSubject.next(true);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoading = false;
        }
      }));
    }
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }
}
