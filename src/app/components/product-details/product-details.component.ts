import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: string | null = null;
  productDetails?: IProduct;

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
    this._ActivatedRoute.paramMap.subscribe(
      (params) =>{
        this.productId = params.get('id');
    });

    if(this.productId != null) {
      this._ProductService.getProductDetailsById(this.productId).subscribe({
        next: (response) => {
          this.productDetails = response.data;
        },
        error: (err) => {console.log(err)}
      })
    }
  }

  addItemToCart() {
    if(this.productId != null) {
      this._CartService.addToCart(this.productId).subscribe({
        next: (response) => {console.log(response)},
        error: (err) => {console.log(err)}
      })
    }
  }
}
