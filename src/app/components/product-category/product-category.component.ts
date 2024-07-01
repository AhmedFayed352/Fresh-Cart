import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit , OnDestroy{

  categoryId: string | null = null;
  allProducts: IProduct[] = [];
  arr: Subscription[] = [];

  constructor(private _ActivatedRoute: ActivatedRoute ,private _ProductService: ProductService , private _CartService:CartService){}

  ngOnInit(): void {
    this.arr.push(this._ActivatedRoute.paramMap.subscribe(
      (params) =>{
        this.categoryId = params.get('categoryId');
    }));

    if(this.categoryId != null) {
      this.arr.push(this._ProductService.getProductByCategory(this.categoryId).subscribe({
        next: (response) => {
          this.allProducts = response.data;
        },
        error: (err) => {console.log(err)}
      }));
    }
  }

  addItemToCart(id:string) {
    this.arr.push(this._CartService.addToCart(id).subscribe({
      next: (response) => {},
      error: (err) => {console.log(err)}
    }));
  }

  ngOnDestroy(): void {
    for(let i =0; i<this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }
}
