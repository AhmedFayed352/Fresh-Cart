import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnDestroy{

  errorMessage: string = '';
  isLoading: boolean = false;
  destroy:any;

  passwordMatch = (control : AbstractControl) : ValidationErrors | null => {
    let {password , rePassword} = control.value;

    return password == rePassword && password && rePassword? null : {passMisMatch: true}
  }

  constructor(private _AuthService: AuthService,
              private toastr:ToastrService){}

  changePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}/)])
  } , {validators: this.passwordMatch});

  handleChangePassword() {
    this.isLoading = true;
    if(this.changePasswordForm.valid) {
      this._AuthService.changePassword(this.changePasswordForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastr.success("Password Changed" , "Successfully");
          this.destroy = setTimeout(()=> {this._AuthService.logOut()} ,2000);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error.errors.msg;
        }
      })
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.destroy);
  }
}
