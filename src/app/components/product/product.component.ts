import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: IProduct;

  constructor(private _CartService:CartService){}

  addItemToCart(id:string) {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {console.log(response)},
      error: (err) => {console.log(err)}
    })
  }
}
