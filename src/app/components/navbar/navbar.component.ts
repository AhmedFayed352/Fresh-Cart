import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLoggedUser:boolean = false;

  constructor(private _AuthService: AuthService,private _Router: Router){}

  logOut() {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
    this._AuthService.isLoggedInSubject.next(false);
  }
  ngOnInit() {
    this._AuthService.isLoggedInSubject.subscribe(
      (islogged) => {this.isLoggedUser = islogged}
    );
  }
}
