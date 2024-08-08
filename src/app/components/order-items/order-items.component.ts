import { Component, Input, OnChanges } from '@angular/core';
import { IOrder } from 'src/app/interfaces/iorder';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnChanges{

  // @Input() userOrder: IOrder[] = [];

  constructor(){}

  ngOnChanges() {
    
  }
  
}
