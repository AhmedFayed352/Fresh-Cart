import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnDestroy{

  errorMessage:string = '';
  isLoading:boolean = false;
  unDestroying!: Subscription;

  constructor(private _AuthService: AuthService, private _Router: Router){}

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  handleForgetPassword(form: FormGroup) {
    this.isLoading = true;
    this.unDestroying = this._AuthService.forgetPassword(form.value).subscribe({
      next: (response) => {
        this._Router.navigate(["/verify-reset-code"]);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoading = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.unDestroying.unsubscribe();
  }
}
