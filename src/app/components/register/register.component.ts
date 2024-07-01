import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy{

  errorMessage:string = '';
  isLoading: boolean = false;
  onDestroying!: Subscription;
  // Custom Validation
  passwordMatch = (control : AbstractControl) : ValidationErrors | null => {
    let {password , rePassword} = control.value;

    return password == rePassword && password && rePassword? null : {passMisMatch: true}
  }

  constructor(private _AuthService: AuthService, private _Router: Router){}

  registerForm: FormGroup = new FormGroup({
    name : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}/)]),
    rePassword : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}/)]),
    phone : new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators: this.passwordMatch})

  handleRegister() {
    if(this.registerForm.valid) {
      this.isLoading = true;
      this.onDestroying = this._AuthService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          this._Router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error.message;
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.onDestroying.unsubscribe();
  }

}
