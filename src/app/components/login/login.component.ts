import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{

  errorMessage:string = '';
  isLoading:boolean = false;
  unDestroying!: Subscription;

  constructor(private _AuthService:AuthService, private _Router:Router , private _CartService:CartService){}

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}/)])
  });

  handleLogin() {
    if(this.loginForm.valid) {
      this.isLoading = true;
      this.unDestroying = this._AuthService.login(this.loginForm.value).subscribe({
        next: (response) => 
          {
            localStorage.setItem('token', response.token);
            this._Router.navigate(["/home"]);
            this.isLoading = false;
            this._AuthService.isLoggedInSubject.next(true);
            //this._CartService.headers = response.token;
          },
        error: (err) => 
          {
            this.errorMessage = err.error.message;
            this.isLoading = false;
          }
      });
    }
  }

  ngOnDestroy(): void {
    this.unDestroying.unsubscribe();
  }
}
