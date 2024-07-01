import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnDestroy{

  errorMessage: string = '';
  isLoading:boolean = false;
  onDestroying!: Subscription;

  constructor(private _AuthService: AuthService, private _Router: Router){}

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}$/)])
  });

  handleResetPassword(form: FormGroup) {
    this.isLoading = true;
    this.onDestroying = this._AuthService.resetPassword(form.value).subscribe({
      next: (response) => {
        this._Router.navigate(['/login']);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoading = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.onDestroying.unsubscribe();
  }
}
