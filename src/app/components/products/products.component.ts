import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit , OnDestroy{

  allProducts: IProduct[] = [];
  searchItem: string = "";
  unDestroying?: Subscription;

  constructor(private _ProductService: ProductService) { }

  ngOnInit() {
    this.unDestroying = this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    if(this.unDestroying != undefined){
      this.unDestroying.unsubscribe();
    }
  }

}
