import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-user-data',
  templateUrl: './change-user-data.component.html',
  styleUrls: ['./change-user-data.component.css']
})
export class ChangeUserDataComponent implements OnDestroy {

  errorMessage: string = '';
  isLoading: boolean = false;
  destroy: any;

  constructor(private _AuthService: AuthService, private toastr: ToastrService) { }

  changeUserDataForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  });

  handleChangeUserDataForm() {
    if (this.changeUserDataForm.valid) {
      this.isLoading = true;
      this._AuthService.changeUserData(this.changeUserDataForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastr.success("name and email Updated", "Successfully");
          this.destroy = setTimeout(() => { this._AuthService.logOut() }, 2000);
        },
        error: (err) => {
          console.log(err);
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
