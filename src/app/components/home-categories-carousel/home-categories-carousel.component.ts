import { ICategory } from './../../interfaces/icategory';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-categories-carousel',
  templateUrl: './home-categories-carousel.component.html',
  styleUrls: ['./home-categories-carousel.component.css']
})
export class HomeCategoriesCarouselComponent implements OnInit , OnDestroy {

  allCategories: ICategory[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    },
    nav: false,
    autoplay:true,
    autoplayHoverPause:true
  }
  unDestroying?: Subscription;

  constructor(private _ProductService: ProductService){}

  ngOnInit() {
    this.unDestroying = this._ProductService.getAllCategories().subscribe({
      next: (response) => {this.allCategories = response.data},
      error: (err) => {console.log(err)}
    })
  }

  ngOnDestroy(): void {
    if(this.unDestroying != undefined) {
      this.unDestroying.unsubscribe();
    }
  }

}
