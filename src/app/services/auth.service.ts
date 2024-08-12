import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRegister } from '../interfaces/iregister';
import { ILogin } from '../interfaces/ilogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedInSubject = new BehaviorSubject<boolean>(localStorage.getItem("token")?true:false);

  constructor(private _httpClient: HttpClient , private _Router: Router) { }

  register(regForm: IRegister) : Observable<IRegister> {
    return this._httpClient.post<IRegister>("https://ecommerce.routemisr.com/api/v1/auth/signup", regForm)
  }

  login(loginForm: ILogin) : Observable<ILogin> {
    return this._httpClient.post<ILogin>("https://ecommerce.routemisr.com/api/v1/auth/signin", loginForm);
  }

  logOut() {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
    this.isLoggedInSubject.next(false);
  }

  forgetPassword(forgetPasswordForm: any): Observable<any> {
    return this._httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", forgetPasswordForm)
  }

  verifyPasswordCode(verifyPasswordForm: any): Observable<any> {
    return this._httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", verifyPasswordForm)
  }

  resetPassword(resetPasswordForm: any): Observable<any> {
    return this._httpClient.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", resetPasswordForm)
  }

  changePassword(changePasswordForm: any): Observable<any> {
    return this._httpClient.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword" , changePasswordForm);
  }

  changeUserData(changeUserDataForm:any):Observable <any> {
    return this._httpClient.put("https://ecommerce.routemisr.com/api/v1/users/updateMe/" , changeUserDataForm);
  }
}
