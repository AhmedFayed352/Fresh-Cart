import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  productId: string | null = null;
  productDetails?: IProduct;
  wishListProductsIdsList: string[] = [];
  arr: Subscription[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay: true,
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

  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductService: ProductService, private _CartService: CartService, private _WishlistService: WishlistService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.arr.push(this._ActivatedRoute.paramMap.subscribe(
      (params) => {
        this.productId = params.get('id');
      }));

    if (this.productId != null) {
      this.arr.push(this._ProductService.getProductDetailsById(this.productId).subscribe({
        next: (response) => {
          this.productDetails = response.data;
        },
        error: (err) => { console.log(err) }
      }));
    }
    this._WishlistService.WishListProductsId.subscribe((idsList) => { this.wishListProductsIdsList = idsList })
  }

  addItemToCart() {
    if (this.productId != null) {
      this.arr.push(this._CartService.addToCart(this.productId).subscribe({
        next: (response) => {
          this._CartService.cartItemsNum.next(response.numOfCartItems);
          this.toastr.success('Added To Cart', 'Successfully');
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Something Went Wrong", 'Error');
        }
      }));
    }
  }

  addToWishlist() {
    if (this.productId != null) {
    if(!this.wishListProductsIdsList.includes(this.productId)) {
        this.arr.push(this._WishlistService.addToWishList(this.productId).subscribe({
          next: (response) => {
            this._WishlistService.wishItemsNum.next(response.data.length);
            this.toastr.success('Added To WishList', 'Successfully');
            this._WishlistService.WishListProductsId.next(response.data);
          },
          error: (err) => {
            console.log(err);
            this.toastr.error("Something Went Wrong", "Error");
          }
        }));
      } else {
        this.arr.push(this._WishlistService.removeWithlistItem(this.productId).subscribe({
          next: (response) => {
            this._WishlistService.wishItemsNum.next(response.data.length);
            this.toastr.success('Removed From WishList', 'Successfully');
            this._WishlistService.WishListProductsId.next(response.data);
          },
          error: (err) => {
            console.log(err);
            this.toastr.error("Something Went Wrong", 'Error');
          }
        }))
      }
    }
  }

  isWishListProduct(id?: string) {
    return this.wishListProductsIdsList.includes(`${id}`);
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i].unsubscribe();
    }
  }
}
