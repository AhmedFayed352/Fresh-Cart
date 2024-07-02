import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.css']
})
export class ProductBrandComponent implements OnInit, OnDestroy{

  brandId: string | null = null;
  allProducts: IProduct[] = [];
  arr: Subscription[] = [];

  constructor(private _ActivatedRoute: ActivatedRoute , private _ProductService:ProductService , private _CartService:CartService){}

  ngOnInit(): void {
    this.arr.push(this._ActivatedRoute.paramMap.subscribe(
      (params) =>{
        this.brandId = params.get('brandId');
    }));

    if(this.brandId != null) {
      this.arr.push(this._ProductService.getProductByBrand(this.brandId).subscribe({
        next: (response) => {
          this.allProducts = response.data;
        },
        error: (err) => {console.log(err)}
      }));
    }
  }

  addItemToCart(id:string) {
    this.arr.push(this._CartService.addToCart(id).subscribe({
      next: (response) => {response},
      error: (err) => {console.log(err)}
    }));
  }

  ngOnDestroy(): void {
    for(let i =0; i<this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }

}
