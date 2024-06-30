import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css']
})
export class VerifyResetCodeComponent {

  errorMessage:string = '';
  isLoading:boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router){}

  verifyPasswordForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  });

  handleVerifyPasswordCode(form: FormGroup) {
    this.isLoading = true;
    this._AuthService.verifyPasswordCode(form.value).subscribe({
      next: (response) => {
        console.log(response);
        this._Router.navigate(['/reset-password']);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoading = false;
      }
    })
  }
}
