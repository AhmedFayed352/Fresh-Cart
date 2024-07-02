import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css']
})
export class VerifyResetCodeComponent implements OnDestroy{

  errorMessage:string = '';
  isLoading:boolean = false;
  unDestroying?: Subscription;

  constructor(private _AuthService: AuthService, private _Router: Router){}

  verifyPasswordForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  });

  handleVerifyPasswordCode(form: FormGroup) {
    this.isLoading = true;
    this.unDestroying = this._AuthService.verifyPasswordCode(form.value).subscribe({
      next: (response) => {
        response
        this._Router.navigate(['/reset-password']);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoading = false;
      }
    })
  }

  ngOnDestroy(): void {
    if(this.unDestroying != undefined) {
      this.unDestroying.unsubscribe();
    }
  }
}
