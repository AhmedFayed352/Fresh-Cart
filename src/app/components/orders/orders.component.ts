import { Component, OnDestroy, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/interfaces/iorder';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  isExist:boolean = false;
  allOrders: IOrder[] = [];
  userOrder: IOrder[] = [];
  isDestroyed!: Subscription;

  token = localStorage.getItem("token");
  decoded: any = jwtDecode(`${this.token}`);
  userId = this.decoded.id;

  constructor(private _OrdersService: OrdersService) { }

  ngOnInit(): void {
    this.isExist = true;
    this.isDestroyed = this._OrdersService.getUserOrders(this.userId).subscribe({
      next: (response) => {
        if(response.length != 0) {
          this.isExist = false;
          this.allOrders = response;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  selectUserOrder(orderId : number) {
    this.userOrder = this.allOrders.filter(order => order.id === orderId);
  }

  ngOnDestroy(): void {
    this.isDestroyed.unsubscribe();
  }
}
