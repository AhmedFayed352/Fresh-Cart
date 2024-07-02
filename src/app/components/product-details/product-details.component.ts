import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit , OnDestroy{

  productId: string | null = null;
  productDetails?: IProduct;
  arr:Subscription[] =[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductService: ProductService , private _CartService:CartService){}

  ngOnInit(): void {
    this.arr.push(this._ActivatedRoute.paramMap.subscribe(
      (params) =>{
        this.productId = params.get('id');
    }));

    if(this.productId != null) {
      this.arr.push(this._ProductService.getProductDetailsById(this.productId).subscribe({
        next: (response) => {
          this.productDetails = response.data;
        },
        error: (err) => {console.log(err)}
      }));
    }
  }

  addItemToCart() {
    if(this.productId != null) {
      this.arr.push(this._CartService.addToCart(this.productId).subscribe({
        next: (response) => {response},
        error: (err) => {console.log(err)}
      }));
    }
  }

  ngOnDestroy(): void {
    for(let i =0; i<this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }
}
