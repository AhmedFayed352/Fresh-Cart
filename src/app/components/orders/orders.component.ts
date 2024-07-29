import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IOrder } from 'src/app/interfaces/iorder';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  isExist:boolean = false;
  allOrders: IOrder[] = [];

  token = localStorage.getItem("token");
  decoded:any = jwtDecode(`${this.token}`);
  userId = this.decoded.id;

  constructor( private _OrdersService:OrdersService){}

  ngOnInit(): void {
    this._OrdersService.getUserOrders(this.userId).subscribe({
      next: (response) => {
        this.allOrders = response;
        console.log(this.allOrders);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  showOrderItems(orderId: number) {
    console.log("hello", orderId);
  }
  
}
