import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{

  allProducts: IProduct[] = [];
  onDestroying!: Subscription;

  constructor(private _ProductService: ProductService){}

  ngOnInit() {
    this.onDestroying = this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.onDestroying.unsubscribe();
  }

}
